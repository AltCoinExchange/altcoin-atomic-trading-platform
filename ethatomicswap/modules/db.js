const driver = require('bigchaindb-driver');

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

    /**
     * Send data to DB
     * @returns {Promise}
     * @constructor
     */
    this.Send = function(data) {
        that = this;
        var tx = driver.Transaction.makeCreateTransaction(
            data,
            null,
            [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(this.kp.publicKey))], this.kp.publicKey);
        var txSigned = driver.Transaction.signTransaction(tx, this.kp.privateKey);
        this.conn.postTransaction(txSigned).then(function (result) {
            that.conn.pollStatusAndFetchTransaction(result.id).then(function(e, r) {
                console.log(e);
            });
        }).then(function (result, res) {
            console.log(result);
        });
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