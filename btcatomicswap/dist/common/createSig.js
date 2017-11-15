'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSig = createSig;

var _config = require('../config/config');

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

function createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
  var wif, WIF, sighashType, sig, pubKey;
  return Promise.resolve().then(function () {
    wif = privateKey;
    WIF = new PrivateKey(wif);
    sighashType = 1;
    sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
    pubKey = WIF.toPublicKey();

    return { sig: sig, pubKey: pubKey };
  });
}