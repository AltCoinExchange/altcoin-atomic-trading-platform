'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeePerKb = undefined;

var _config = require('../config/config');

var _rawRequest = require('./rawRequest');

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var getFeePerKb = exports.getFeePerKb = function getFeePerKb() {
  var estimateRawResp;
  return Promise.resolve().then(function () {
    return (0, _rawRequest.estimateFee)();
  }).then(function (_resp) {
    // let getFee = new Promise((resolve, reject) => {
    //   rpc.getInfo((r, data) => {
    //     const info = data.result;
    //     const relayFee = info.relayfee;
    //     let maxFee = info.paytxfee;
    //     let useFee;
    //
    //     if (info.paytxfee !== 0) {
    //       if (info.paytxfee > maxFee) {
    //         maxFee = relayFee;
    //       }
    //       useFee = maxFee;
    //       resolve(useFee);
    //     }
    //     resolve(undefined);
    //   });
    // });
    //
    // const fee = await getFee;
    //
    // if (fee) {
    //   return fee;
    // }

    estimateRawResp = _resp;

    return estimateRawResp.data.result.feerate;
  });
};