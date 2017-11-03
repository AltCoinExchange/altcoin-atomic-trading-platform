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

// export async function createSig(addr){
async function createSig(tx, idx, pkScript, addr) {
  var wif = await getPrivKey(addr);
  var WIF = new PrivateKey(wif);
  var sig = Transaction.Sighash.sign(tx, WIF, 1, idx, pkScript);
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