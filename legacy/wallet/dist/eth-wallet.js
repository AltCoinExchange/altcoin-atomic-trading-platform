"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ethereum wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var EthWallet = exports.EthWallet = function () {

    //atomicSwap;

    function EthWallet() {
        _classCallCheck(this, EthWallet);

        this.AppConfig = require("ethatomicswap/config.json");
        this.AtomicSwap = require("ethatomicswap/modules/atomicswap");
        this.AbiConfig = require("ethatomicswap/abi/atomicswap.json");
        this.BinConfig = require("ethatomicswap/abi/bin.json");
        this.atomicSwap = new this.AtomicSwap(this.AbiConfig, this.AppConfig.hosts[0], this.BinConfig);
    }

    /**
     * Login
     * @param keystore
     * @param password
     */


    _createClass(EthWallet, [{
        key: "login",
        value: function login(keystore, password) {

            if (keystore === null) this.keystore = require("ethatomicswap/testAccount.json").keystore;

            return this.atomicSwap.engine.Login(keystore, password);
        }

        /**
         * Create account
         * @param password
         * @returns {{wallet, keystore}}
         */

    }, {
        key: "create",
        value: function create(password) {
            return this.atomicSwap.engine.CreateAccount(password);
        }

        /**
         * Recover account with password
         * @param password
         * @param privateKey
         * @returns {{wallet, keystore}}
         */

    }, {
        key: "recover",
        value: function recover(privateKey, password) {
            return this.atomicSwap.engine.RecoverAccount(privateKey, password);
        }

        /**
         * Get wallet balance
         * @param address
         * @returns {*}
         */

    }, {
        key: "getbalance",
        value: function getbalance(address) {
            return this.atomicSwap.engine.GetBalance(address);
        }

        /**
        * Send All Ether
        * @param privateKey
        * @param toAddress
        * @returns {Promise<number>}
        */

    }, {
        key: "sendAllEther",
        value: function sendAllEther(privateKey, toAddress) {
            var _this = this;

            return _this.atomicSwap.engine.sendAllEther(privateKey, toAddress);
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
        value: function initiate(refundTime, secret, address, amount) {
            var secretObj,
                result,
                _this2 = this;

            return Promise.resolve().then(function () {
                secretObj = null;


                if (secret === '') {
                    secretObj = _this2.atomicSwap.common.GenerateSecret();
                    secret = '0x' + secretObj.hashedSecret;
                }

                return _this2.atomicSwap.Initiate(refundTime, secret, address, amount);
            }).then(function (_resp) {
                result = _resp;

                result.secret = secretObj;
                return result;
            });
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
            var result,
                _this3 = this;

            return Promise.resolve().then(function () {
                return _this3.atomicSwap.Participate(refundTime, secret, address, amount);
            }).then(function (_resp) {
                result = _resp;

                return result;
            });
        }

        /**
         * Extract swap info
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "extractsecret",
        value: function extractsecret(hashedSecret) {
            var result,
                _this4 = this;

            return Promise.resolve().then(function () {
                return _this4.atomicSwap.ExtractSecret(hashedSecret);
            }).then(function (_resp) {
                result = _resp;

                return result;
            });
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
            var result,
                _this5 = this;

            return Promise.resolve().then(function () {
                return _this5.atomicSwap.Redeem(secret, hashedSecret);
            }).then(function (_resp) {
                result = _resp;

                return result;
            });
        }

        /**
         * Refund atomic swap
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "refund",
        value: function refund(hashedSecret) {
            var result,
                _this6 = this;

            return Promise.resolve().then(function () {
                return _this6.atomicSwap.Refund(hashedSecret);
            }).then(function (_resp) {
                result = _resp;

                return result;
            });
        }
    }]);

    return EthWallet;
}();