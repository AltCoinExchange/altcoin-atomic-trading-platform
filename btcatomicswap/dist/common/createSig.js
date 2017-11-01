'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSig = createSig;

var _config = require('../config/config');

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

async function createSig(addr) {
  // export async function createSig(tx, idx, pkScript, addr){
  wif = rpc.DumpPrivKey(addr);
  console.log(wif);
}