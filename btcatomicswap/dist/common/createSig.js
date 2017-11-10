'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSig = createSig;

var _config = require('../config/config');

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

async function createSig(reedemTx, inputIndex, contract, recipientAddress) {
  var wif = await getPrivKey(recipientAddress);
  var WIF = new PrivateKey(wif);
  var sighashType = 1;
  var sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
  var pubKey = WIF.toPublicKey();
  return { sig: sig, pubKey: pubKey };
}

var getPrivKey = async function getPrivKey(addr) {
  return new Promise(function (resolve, reject) {
    rpc.dumpPrivKey(addr, function (c, e) {
      resolve(e.result);
    });
  });
};
