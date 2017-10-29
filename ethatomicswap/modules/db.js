const driver = require('bigchaindb-driver');
const WebSocket = global.WebSocket || global.MozWebSocket || require('ws');

/**
 * Atomic swap class
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
var Db = function (configuration) {
    this.config = configuration;
    this.kp = new driver.Ed25519Keypair();
    this.conn = null;
    this.ws = null;

    /**
     * Send data to DB
     * @returns {Promise}
     * @constructor
     */
    this.Send = function(data, callbackPost) {
        that = this;
        var tx = driver.Transaction.makeCreateTransaction(
            data,
            null,
            [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(this.kp.publicKey))], this.kp.publicKey);
        var txSigned = driver.Transaction.signTransaction(tx, this.kp.privateKey);
        this.conn.postTransaction(txSigned).then(callbackPost);
    };

    /**
     * Get data from transaction id
     * @param id
     * @constructor
     */
    this.Get = function(id) {
        return this.conn.pollStatusAndFetchTransaction(id);
    };

    /**
     * Find data using MongoDB filter (only supported by now)
     * @param data
     * @constructor
     */
    this.Find = function(data) {
        return this.conn.searchAssets(data);
    };

    /**
     * Subscribe to transaction feed
     * @param callback events
     */
    this.Subscribe = function(callback) {

        this.ws = new WebSocket(this.config.wshost, {});

        this.ws.on('open', function open() {
            console.log('Connected!');
        });

        this.ws.on('close', function close() {
            console.log('Disconnected!');
        });

        this.ws.on('message', callback);
    };

    /**
     * Constructor
     */
    this.construct = function() {
        this.conn = new driver.Connection(this.config.apihost, { app_id: this.config.appid, app_key: this.config.appkey });
    };

    this.construct();
};

module.exports = Db;