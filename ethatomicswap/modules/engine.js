/**
 * Trading engine class
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var Common = require("./common");
var Web3 = require("web3");
var EthereumWallet = require('ethereumjs-wallet');
var Accounts = require("web3-eth-accounts");

var Engine = function (configuration, appConfiguration) {
    this.config = configuration;
    this.appConfig = appConfiguration;
    this.web3 = null;
    this.contract = null;
    this.clone = require("clone");
    this.common = null;
    this.web3 = null;
    this.wallet = null;
    this.walletN = 256;

    /**
     * Get function configuration
     * @param abi
     * @param name
     * @returns {*}
     */
    this.getFunctionAbi = function(abi, name) {
        for (var i = 0; i < abi.length; i++) {
            if (abi[i].name == name)
                return abi[i];
        }
    };

    /**
     * Call contract function
     * @param name
     * @param address
     * @param params
     * @param generalParams
     */
    this.callFunction = function(name, params, generalParams) {

        var functionAbi = this.clone(this.getFunctionAbi(this.config, name));
        var contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);

        var funcObj = {};

        funcObj._method = functionAbi;
        funcObj._parent = contract;
        funcObj.encodeABI = contract._encodeMethodABI.bind(funcObj);
        funcObj.arguments = params;
        that = this;

        return new Promise(function (resolve, reject) {
            try {

                // TODO: Catch events
                var event = contract.events.Initiated({}/*{filter: {from: "0x6D5ae9dd8F1a2582Deb1b096915313459f11ba70"}}*/, function (err, result, sub) {
                    console.log(result);
                    sub.unsubscribe();
                });

                // TODO Catch filters
                // var filter = that.web3.eth.filter('pending');
                //
                // filter.watch(function (error, log) {
                //     console.log(log);
                // });

                contract._executeMethod.call(funcObj, 'send', generalParams, function (err, result) {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                }).then(function(r) {
                    console.log(r);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * Create wallet
     * @param password
     * @constructor
     */
    this.CreateAccount = function(password) {
        var accounts = new Accounts();

        var acc = accounts.create();
        var keystore = acc.encrypt(password, {n: this.walletN});

        return {wallet: acc, keystore: keystore};
    };

    this.Login = function(keystore, password) {
        var accounts = new Accounts();

        var wallet = accounts.decrypt(keystore, password);

        return wallet;
    };

    /**
     * Constructor
     */
    this.construct = function() {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.appConfig.wshost));
        this.web3.defaultAccount = this.appConfig.defaultWallet;
        this.common = new Common();
        // Need to init first since it is throwing exception
        this.contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);
    };

    this.construct();
};

module.exports = Engine;