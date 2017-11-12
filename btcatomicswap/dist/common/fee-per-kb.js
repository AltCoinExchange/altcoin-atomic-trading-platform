'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeePerKb = undefined;

var _config = require('../config/config');

var _rawRequest = require('./rawRequest');

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var getFeePerKb = exports.getFeePerKb = async function getFeePerKb() {
  var getFee = new Promise(function (resolve, reject) {
    rpc.getInfo(function (r, data) {
      var info = data.result;
      var relayFee = info.relayfee;
      var maxFee = info.paytxfee;
      var useFee = void 0;

      if (info.paytxfee !== 0) {
        if (info.paytxfee > maxFee) {
          maxFee = relayFee;
        }
        useFee = maxFee;
        resolve(useFee);
      }
      resolve(undefined);
    });
  });

  var fee = await getFee;

  if (fee) {
    return fee;
  }

  var estimateRawResp = await (0, _rawRequest.estimateFee)();
  return estimateRawResp.data.result.feerate;
};