"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Trading engine class
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var Common = require("./common");
var Web3 = require("web3");
var Accounts = require("web3-eth-accounts");

var Engine = function Engine(configuration, appConfiguration, bin) {
    this.config = configuration;
    this.appConfig = appConfiguration;
    this.bin = bin;
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
    this.getFunctionAbi = function (abi, name) {
        for (var i = 0; i < abi.length; i++) {
            if (abi[i].name == name) return abi[i];
        }
    };
    //
    // /**
    //  * Call contract function
    //  * @param name
    //  * @param address
    //  * @param params
    //  * @param generalParams
    //  */
    // this.callFunction = function (name, params, generalParams, confirmation) {
    //     var functionAbi,
    //         contract,
    //         price,
    //         ets,
    //         _this = this;
    //
    //     return Promise.resolve().then(function () {
    //         confirmation = confirmation === undefined ? 0 : confirmation;
    //         functionAbi = _this.clone(_this.getFunctionAbi(_this.config, name));
    //         contract = new _this.web3.eth.Contract(_this.config, _this.appConfig.contractAddress);
    //
    //         // var funcObj = {};
    //         //
    //         // funcObj._method = functionAbi;
    //         // funcObj._parent = contract;
    //         // funcObj.encodeABI = contract._encodeMethodABI.bind(funcObj);
    //         // funcObj.arguments = params;
    //         //that = this;
    //
    //         if (generalParams.gas === undefined) {
    //             return Promise.resolve().then(function () {
    //                 return _this.web3.eth.getGasPrice();
    //             }).then(function (_resp) {
    //                 price = _resp;
    //                 return _this.web3.eth.estimateGas({ data: _this.bin.code, to: _this.appConfig.defaultWallet });
    //             }).then(function (_resp) {
    //                 ets = _resp;
    //                 //params.gas = price;
    //
    //                 generalParams.gas = ets;
    //                 generalParams.gasLimit = ets * 2;
    //             });
    //         }
    //     }).then(function () {
    //         return new Promise(function (resolve, reject) {
    //             try {
    //                 var _contract$methods;
    //
    //                 // TODO: Catch events
    //                 // var event = contract.events.Initiated(
    //                 //  {}/*{filter: {from: "0x6D5ae9dd8F1a2582Deb1b096915313459f11ba70"}}*/, function (err, result, sub) {
    //                 //     console.log(result);
    //                 //     sub.unsubscribe();
    //                 // });
    //
    //                 var method = (_contract$methods = contract.methods)[name].apply(_contract$methods, _toConsumableArray(params));
    //
    //                 if (confirmation === 0) {
    //                     method.send(generalParams).on('receipt', function (rec) {
    //                         resolve(rec);
    //                     }).catch(function (err) {
    //                         reject(err);
    //                     });
    //                 } else if (confirmation === 1) {
    //                     method.send(generalParams).on('confirmation', function (confNumber, receipt) {
    //                         receipt.confNumber = confNumber;
    //                         resolve(receipt);
    //                     }).catch(function (err) {
    //                         reject(err);
    //                     });
    //                 } else if (confirmation === 2) {
    //                     method.call(generalParams, function (err, result) {
    //                         resolve(result);
    //                     }).catch(function (err) {
    //                         reject(err);
    //                     });
    //                 }
    //             } catch (e) {
    //                 reject(e);
    //             }
    //         });
    //     });
    // };

    /**
     * Create wallet
     * @param password
     * @constructor
     */
    this.CreateAccount = function (password) {
        var accounts = this.web3.eth.accounts;

        console.log(password);
        var acc = accounts.create();
        var keystore = acc.encrypt(password, { n: this.walletN });

        return { wallet: acc, keystore: keystore };
    };

    /**
     * Recover account from password
     * @param password
     * @returns {*}
     * @constructor
     */
    this.RecoverAccount = function (privateKey, password) {
        var accounts = this.web3.eth.accounts;
        var acc = accounts.privateKeyToAccount(this.web3.utils.asciiToHex(privateKey));
        return acc.encrypt(privateKey, password);
    };

    /**
     * Login
     * @param keystore
     * @param password
     * @returns {Account}
     * @constructor
     */
    this.Login = function (keystore, password) {
        var accounts = this.web3.eth.accounts;

        var wallet = accounts.decrypt(keystore, password);
        this.appConfig.defaultWallet = wallet.address;

        this.web3.eth.accounts.wallet.add(wallet);
        this.web3.eth.defaultAccount = wallet.address;

        return wallet;
    };

    /**
     * Get balance
     * @param address
     * @returns {Promise<number>}
     * @constructor
     */
    this.GetBalance = function (address) {
        var that = this;
        return this.web3.eth.getBalance(address).then(function (balance) {
            return that.web3.utils.fromWei(balance, 'ether');
        });
    };

    /**
     * Send All Ether
     * @param privateKey
     * @param toAddress
     * @returns {Promise<number>}
     * @constructor
     */
    // this.SendAllEther = async function(privateKey, toAddress) {
    //
    //     var currentBalance = await this.web3.eth.getBalance(this.web3.eth.defaultAccount);
    //     var currentGasPrice = await this.web3.eth.getGasPrice();
    //
    //     var estimateGas = await this.web3.eth.estimateGas(
    //         {
    //           from: this.web3.eth.defaultAccount,
    //           to: toAddress,
    //           amount: currentBalance
    //         }
    //     );
    //
    //     var signedTx = await this.web3.eth.signTransaction(
    //         {
    //           from: this.web3.eth.defaultAccount,
    //           gasPrice: currentGasPrice,
    //           gas: estimateGas,
    //           gasLimit: estimateGas * 2,
    //           to: toAddress,
    //           value: currentBalance - estimateGas * currentGasPrice * 2,
    //           data: '',
    //         }, privateKey
    //     );
    //
    //     return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // };

    /**
     * Constructor
     */
    this.construct = function () {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.appConfig.wshost));
        this.web3.defaultAccount = this.appConfig.defaultWallet;
        this.common = new Common();
        // Need to init first since it is throwing exception
        this.contract = new this.web3.eth.Contract(this.config, this.appConfig.contractAddress);
    };

    this.construct();
};

module.exports = Engine;