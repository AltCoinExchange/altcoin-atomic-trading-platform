"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var config_2 = require("../../btcatomicswap/src/config/config");
var Mnemonic = require('bitcore-mnemonic');
var bitcore = require('bitcore');
var HDPrivateKey = bitcore.HDPrivateKey;
var PrivateKey = bitcore.PrivateKey;
var BtcWallet = function () {
    function BtcWallet(code, regenerate) {
        if (regenerate === void 0) {
            regenerate = false;
        }
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
    BtcWallet.prototype.generateHDPrivateKey = function (passPhrase) {
        this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, config_1.btcRpcConfiguration.network);
        return this.hierarhicalPrivateKey;
    };
    BtcWallet.prototype.deriveHdPrivateKey = function (deriveArg) {
        if (!this.hierarhicalPrivateKey) {
            throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
        }
        var derived = this.hierarhicalPrivateKey.derive(deriveArg);
        this.derived[deriveArg] = derived;
        return derived;
    };
    BtcWallet.prototype.generateAddress = function (hdPublicKey) {
        if (!hdPublicKey) {
            throw new Error('hdPublicKey required to generate address');
        }
        var address = hdPublicKey.publicKey.toAddress();
        this.addressess[hdPublicKey] = address;
        return address;
    };
    BtcWallet.prototype.generateAddressFromWif = function (wif) {
        var WIF = new PrivateKey(wif);
        return WIF.toPublicKey().toAddress(config_2.configuration.network);
    };
    BtcWallet.prototype.getDerived = function () {
        return this.derived;
    };
    return BtcWallet;
}();
exports.BtcWallet = BtcWallet;