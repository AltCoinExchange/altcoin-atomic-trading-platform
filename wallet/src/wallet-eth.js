"use strict";
/**
 * Ethereum wallet TS
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = require("./config/config-eth");
var EthWallet = (function () {
    function EthWallet() {
        this.AtomicSwap = require('ethatomicswap/modules/atomicswap');
        this.AbiConfig = require('./config/abi/atomicswap.json');
        this.BinConfig = require('./config/abi/bin.json');
        this.atomicSwap = new this.AtomicSwap(this.AbiConfig, AppConfig.EthConfiguration.hosts[0], this.BinConfig);
    }
    /**
     * Login
     * @param keystore
     * @param password
     */
    EthWallet.prototype.login = function (keystore, password) {
        return this.atomicSwap.engine.Login(keystore, password);
    };
    /**
     * Create account
     * @param password
     * @returns {{wallet, keystore}}
     */
    EthWallet.prototype.create = function (password) {
        return this.atomicSwap.engine.CreateAccount(password);
    };
    /**
     * Recover account with password
     * @param password
     * @param privateKey
     * @returns {{wallet, keystore}}
     */
    EthWallet.prototype.recover = function (privateKey, password) {
        return this.atomicSwap.engine.RecoverAccount(privateKey, password);
    };
    /**
     * Get wallet balance
     * @param address
     * @returns {*}
     */
    EthWallet.prototype.getbalance = function (address) {
        return this.atomicSwap.engine.GetBalance(address);
    };
    /**
    * Send All Ether
    * @param privateKey
    * @param toAddress
    * @returns {Promise<number>}
    */
    EthWallet.prototype.sendAllEther = function (privateKey, toAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.atomicSwap.engine.sendAllEther(privateKey, toAddress)];
            });
        });
    };
    /**
     * Initiate atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */
    EthWallet.prototype.initiate = function (refundTime, secret, address, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var secretObj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secretObj = null;
                        if (secret === '') {
                            secretObj = this.atomicSwap.common.GenerateSecret();
                            secret = '0x' + secretObj.hashedSecret;
                        }
                        return [4 /*yield*/, this.atomicSwap.Initiate(refundTime, secret, address, amount)];
                    case 1:
                        result = _a.sent();
                        result.secret = secretObj;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Participate in atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */
    EthWallet.prototype.participate = function (refundTime, secret, address, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atomicSwap.Participate(refundTime, secret, address, amount)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Extract swap info
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    EthWallet.prototype.extractsecret = function (hashedSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atomicSwap.ExtractSecret(hashedSecret)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Redeem atomic swap
     * @param secret
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    EthWallet.prototype.redeem = function (secret, hashedSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atomicSwap.Redeem(secret, hashedSecret)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Refund atomic swap
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    EthWallet.prototype.refund = function (hashedSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atomicSwap.Refund(hashedSecret)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return EthWallet;
}());
exports.EthWallet = EthWallet;
