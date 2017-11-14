'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSig = createSig;

var _config = require('../config/config');

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

async function createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
  var wif = privateKey;
  var WIF = new PrivateKey(wif);
  var sighashType = 1;
  var sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
  var pubKey = WIF.toPublicKey();
  return { sig: sig, pubKey: pubKey };
}