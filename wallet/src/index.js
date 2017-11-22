"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wallet_btc_1 = require("./wallet-btc");
var Mnemonic = require('bitcore-mnemonic');
var wallet_eth_1 = require("./wallet-eth");
// import {DcrWallet} from "./dcr-wallet";
var Wallet = (function () {
    function Wallet() {
    }
    Object.defineProperty(Wallet, "Ethereum", {
        get: function () {
            return {
                EthWallet: wallet_eth_1.EthWallet
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
                BtcWallet: wallet_btc_1.BtcWallet
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
