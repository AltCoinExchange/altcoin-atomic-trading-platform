"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(privateKey, toAddress) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt("return", this.atomicSwap.engine.sendAllEther(privateKey, toAddress));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function sendAllEther(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return sendAllEther;
        }()

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
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(refundTime, secret, address, amount) {
                var secretObj, result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                secretObj = null;


                                if (secret === '') {
                                    secretObj = this.atomicSwap.common.GenerateSecret();
                                    secret = '0x' + secretObj.hashedSecret;
                                }

                                _context2.next = 4;
                                return this.atomicSwap.Initiate(refundTime, secret, address, amount);

                            case 4:
                                result = _context2.sent;

                                result.secret = secretObj;
                                return _context2.abrupt("return", result);

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function initiate(_x3, _x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return initiate;
        }()

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
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(refundTime, secret, address, amount) {
                var result;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.atomicSwap.Participate(refundTime, secret, address, amount);

                            case 2:
                                result = _context3.sent;
                                return _context3.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function participate(_x7, _x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
            }

            return participate;
        }()

        /**
         * Extract swap info
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "extractsecret",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(hashedSecret) {
                var result;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.atomicSwap.ExtractSecret(hashedSecret);

                            case 2:
                                result = _context4.sent;
                                return _context4.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function extractsecret(_x11) {
                return _ref4.apply(this, arguments);
            }

            return extractsecret;
        }()

        /**
         * Redeem atomic swap
         * @param secret
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "redeem",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(secret, hashedSecret) {
                var result;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.atomicSwap.Redeem(secret, hashedSecret);

                            case 2:
                                result = _context5.sent;
                                return _context5.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function redeem(_x12, _x13) {
                return _ref5.apply(this, arguments);
            }

            return redeem;
        }()

        /**
         * Refund atomic swap
         * @param hashedSecret
         * @returns {Promise.<*>}
         */

    }, {
        key: "refund",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(hashedSecret) {
                var result;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.atomicSwap.Refund(hashedSecret);

                            case 2:
                                result = _context6.sent;
                                return _context6.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function refund(_x14) {
                return _ref6.apply(this, arguments);
            }

            return refund;
        }()
    }]);

    return EthWallet;
}();