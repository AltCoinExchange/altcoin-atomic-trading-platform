'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signTransaction = undefined;

var _config = require('../config/config');

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var signTransaction = exports.signTransaction = async function signTransaction(tx) {
  return new Promise(function (resolve, reject) {
    rpc.signRawTransaction(tx, function (c, e) {
      console.log(e);
      resolve(e.result);
    });
  });
};