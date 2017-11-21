"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var btc_wallet_1 = require("./btc-wallet");
var Mnemonic = require('bitcore-mnemonic');
var eth_wallet_1 = require("./eth-wallet");
// import {DcrWallet} from "./dcr-wallet";
var Wallet = (function () {
    function Wallet() {
    }
    Object.defineProperty(Wallet, "Ethereum", {
        get: function () {
            return {
                EthWallet: eth_wallet_1.EthWallet
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wallet, "Bitcoin", {
        // static get Decred() {
        //     return {
        //         DcrWallet
        //     };
        // }
        get: function () {
            return {
                BtcWallet: btc_wallet_1.BtcWallet
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wallet, "code", {
        get: function () {
            return new Mnemonic();
        },
        enumerable: true,
        configurable: true
    });
    return Wallet;
}());
exports.Wallet = Wallet;
