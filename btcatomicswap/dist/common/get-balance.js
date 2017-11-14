'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBalance = undefined;

var _config = require('../config/config');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

var RpcClient = require('bitcoind-rpc');
var Address = require('bitcore').Address;
var rpc = new RpcClient(_config.configuration);

// export async function createSig(reedemTx, inputIndex, contract, recipientAddress){
//     const wif = await getPrivKey(recipientAddress)
//     const WIF = new PrivateKey(wif)
//     const sighashType = 1
//     const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract)
//     const pubKey = WIF.toPublicKey()
//     return {sig, pubKey}
// }
var getBalance = exports.getBalance = async function getBalance(address) {
    //const addr = new Address(address);
    //const accAddr = await getFunc('getAccountAddress', [address]);
    //const rec = await getFunc('getReceivedByAddress', [accAddr, 1]);

    //const addrs = await getFunc('getAddressesByAccount', [address]);

    //const addrBalance = await getFunc('getReceivedByAddress', [address, 1]);

    //console.log(addrs);

    var balance = await getFunc('getBalance', [address, 1]);
    return balance;
};

var getFunc = async function getFunc(func, params) {
    return new Promise(function (resolve, reject) {
        rpc[func].apply(rpc, _toConsumableArray(params).concat([function (c, e) {
            resolve(e.result);
        }]));
    });
};