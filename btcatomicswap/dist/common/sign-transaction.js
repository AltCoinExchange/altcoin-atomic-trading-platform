'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signTransaction = undefined;

var _config = require('../config/config');

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var signTransaction = exports.signTransaction = function signTransaction(tx) {
  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      rpc.signRawTransaction(tx, function (c, e) {
        resolve(e.result);
      });
    });
  });
};