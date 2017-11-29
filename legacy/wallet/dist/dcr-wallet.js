"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DcrWallet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buildContract = require("../../btcatomicswap/src/contract/build-contract");

var _secretHash = require("../../btcatomicswap/src/common/secret-hash");

var _unixTs = require("../../btcatomicswap/src/common/unix-ts");

var _config = require("../../btcatomicswap/src/config/config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tls = require("tls");
tls.DEFAULT_ECDH_CURVE = "secp521r1";

var Mnemonic = require('bitcore-mnemonic');
var bitcore = require('bitcore');
var HDPrivateKey = bitcore.HDPrivateKey;
var PrivateKey = bitcore.PrivateKey;

/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var DcrWallet = exports.DcrWallet = function () {
    function DcrWallet(code) {
        var regenerate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, DcrWallet);

        this.AppConfig = require("../dcrConfig.json");

        var dcrcoin = require('node-dcr-rpc');

        this.dcrd = new dcrcoin.Client({
            host: this.AppConfig.host,
            dcrdPort: this.AppConfig.port, // dcrd port
            dcrWalletPort: this.AppConfig.walletPort, // dcrwallet port
            //port: this.AppConfig.port,
            user: this.AppConfig.user,
            pass: this.AppConfig.pass,
            ssl: this.AppConfig.ssl,
            sslCa: this.AppConfig.sslCa
        });

        if (regenerate === true) {
            this.hdPrivateKey = new HDPrivateKey(code);
        } else {
            var valid = Mnemonic.isValid(code);
            if (!valid) {
                throw Error('Not valid mnemonic code');
            }
            this.code = new Mnemonic(code);
        }
        this.derived = {};
        this.addressess = {};
    }

    /**
     * Login
     * @param keystore
     * @param password
     */


    _createClass(DcrWallet, [{
        key: "login",
        value: function login(account, password) {
            this.dcrd.wallet.authenticate(account, password, function (err, wallets) {
                if (err) {
                    return console.log(err);
                }
                console.log(wallets);
            });
        }

        /**
         * Create account
         * @param accName
         * @returns {{address}}
         */

    }, {
        key: "create",
        value: function create(accName, password) {
            this.dcrd.wallet.createnewaccount(accName, password, function (err, wallets) {
                if (err) {
                    return console.log(err);
                }
                console.log(wallets);
            });
            // const accountName = accName;
            // this.dcrd.cmd('createnewaccount', accountName, function(err, wallets){
            //     if (err) {
            //         return console.log(err);
            //     }
            //
            //     console.log('createenwaccount:', "true");
            //     this.dcrd.cmd('getnewaddress', accountName, function(err, address){
            //         if (err) return console.log(err);
            //         console.log('getnewaddress:', address);
            //         return address;
            //     });
            // });
        }
    }, {
        key: "test",
        value: function test() {
            this.dcrd.wallet.listscripts(function (err, info) {
                if (err) return console.log(err);
                console.log('scripts:', info);
            });
        }
    }, {
        key: "getInfo",
        value: function getInfo() {
            this.dcrd.getinfo(function (err, info) {
                if (err) return console.log(err);
                console.log('info:', info);
            });
        }
    }, {
        key: "listAccounts",
        value: function listAccounts() {
            this.dcrd.wallet.listaccounts(function (err, accounts) {
                if (err) return console.log(err);
                console.log('listaccounts:', accounts);
            });
        }
    }, {
        key: "getBalance",
        value: function getBalance() {
            this.dcrd.wallet.getbalance(function (err, balance) {
                if (err) return console.log(err);
                console.log('getbalance:', balance);
            });
        }

        /**
         * Recover account with password
         * @param password
         * @param privateKey
         * @returns {{wallet, keystore}}
         */

    }, {
        key: "recover",
        value: function recover(privateKey, password) {}

        /**
         * Get wallet balance
         * @param address
         * @returns {*}
         */

    }, {
        key: "getbalance",
        value: function getbalance(address) {}

        /**
         * Send All Ether
         * @param privateKey
         * @param toAddress
         * @returns {Promise<number>}
         */

    }, {
        key: "sendAllEther",
        value: function sendAllEther(privateKey, toAddress) {
            return Promise.resolve();
        }

        /**
         * Initiate atomic swap
         * @param refundTime
         * @param secret
         * @param address
         * @param amount
         * @returns {Promise.<*>}
         */

    }, {
        key: "initiate",
        value: function initiate(them, amount, privateKey) {
            var _generateSecret,
                secret,
                secretHash,
                lockTime,
                b,
                _this2 = this;

            return Promise.resolve().then(function () {
                _generateSecret = (0, _secretHash.generateSecret)();
                secret = _generateSecret.secret;
                secretHash = _generateSecret.secretHash;
                lockTime = (0, _unixTs.getUnixTimeFor2Days)();
                return (0, _buildContract.buildContract)(them, amount, lockTime, secretHash, privateKey);
            }).then(function (_resp) {
                b = _resp;


                _this2.dcrd.sendrawtransaction(b.contractTx.toString(), function (err, info) {
                    if (err) return console.log(err);
                    console.log('info:', info);

                    return {
                        secret: secret,
                        secretHash: secretHash,
                        fee: b.contractFee,
                        contract: b.contractP2SH.toString(),
                        contractHex: b.contract.toHex(),
                        contractTx: b.contractTx.hash,
                        contractTxHex: b.contractTx.toString(),
                        rawTx: rawTx
                    };
                });
            });
        }
    }, {
        key: "generateHDPrivateKey",
        value: function generateHDPrivateKey(passPhrase) {
            this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, btcRpcConfiguration.network);
            return this.hdPrivateKey;
        }
    }, {
        key: "deriveHdPrivateKey",
        value: function deriveHdPrivateKey(deriveArg) {
            if (!this.hdPrivateKey) {
                throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
            }
            var derived = this.hdPrivateKey.derive(deriveArg);
            this.derived[deriveArg] = derived;
            return derived;
        }
    }, {
        key: "generateAddress",
        value: function generateAddress(hdPublicKey) {
            if (!hdPublicKey) {
                throw new Error('hdPublicKey required to generate address');
            }
            var address = hdPublicKey.publicKey.toAddress();
            this.addressess[hdPublicKey] = address;
            return address;
        }
    }, {
        key: "generateAddressFromWif",
        value: function generateAddressFromWif(wif) {
            var WIF = new PrivateKey(wif);
            return WIF.toPublicKey().toAddress(_config.configuration.network);
        }
    }, {
        key: "getDerived",
        value: function getDerived() {
            return this.derived;
        }

        /**
         * Participate in atomic swap
         * @param refundTime
         * @param secret
         * @param address
         * @param amount
         * @returns {Promise.<*>}
         */

    }, {
        key: "participate",
        value: function participate(refundTime, secret, address, amount) {
            return Promise.resolve();
        }

        /**
         * Extract swap info
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "extractsecret",
        value: function extractsecret(hashedSecret) {
            return Promise.resolve();
        }

        /**
         * Redeem atomic swap
         * @param secret
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "redeem",
        value: function redeem(secret, hashedSecret) {
            return Promise.resolve();
        }

        /**
         * Refund atomic swap
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "refund",
        value: function refund(hashedSecret) {
            return Promise.resolve();
        }
    }]);

    return DcrWallet;
}();