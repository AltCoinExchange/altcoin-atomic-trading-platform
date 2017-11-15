'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnspentOutputs = exports.estimateFee = exports.fundRawTransaction = exports.getRawChangeAddress = undefined;

var _config = require('../config/config');

var axios = require('axios');


var url = _config.configuration.protocol + '://' + _config.configuration.user + ':' + _config.configuration.pass + '@' + _config.configuration.host + ':' + _config.configuration.port;

var getRawChangeAddress = exports.getRawChangeAddress = function getRawChangeAddress() {
  var data, response;
  return Promise.resolve().then(function () {
    data = {
      "method": "getrawchangeaddress",
      "rpcuser": _config.configuration.user,
      "rpcpassword": _config.configuration.pass
    };
    return Promise.resolve().then(function () {
      return axios.post(url, data, {
        auth: {
          username: _config.configuration.user,
          password: _config.configuration.pass
        }
      });
    }).then(function (_resp) {
      response = _resp;

      return response.data.result;
    }).catch(function (err) {
      console.log('err', err);
      return null;
    });
  }).then(function () {});
};

/**
 *
 * @param tx
 * @param feePerKb
 * @returns fundedTransaction, fee
 */
var fundRawTransaction = exports.fundRawTransaction = function fundRawTransaction(tx, feePerKb) {
  return Promise.resolve().then(function () {
    try {
      return axios.post(url, {
        "rpcuser": _config.configuration.user,
        "rpcpassword": _config.configuration.pass,
        "method": "fundrawtransaction",
        "params": [tx, { "feeRate": feePerKb }]
      }, {
        auth: {
          username: _config.configuration.user,
          password: _config.configuration.pass
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  });
};

var estimateFee = exports.estimateFee = function estimateFee() {
  return Promise.resolve().then(function () {
    return axios.post(url, {
      "rpcuser": _config.configuration.user,
      "rpcpassword": _config.configuration.pass,
      "method": "estimatesmartfee",
      "params": [6]
    }, {
      auth: {
        username: _config.configuration.user,
        password: _config.configuration.pass
      }
    });
  });
};

var getUnspentOutputs = exports.getUnspentOutputs = function getUnspentOutputs(addr) {
  var numOfConfirmations, urlQuery, res, unspentOutputs;
  return Promise.resolve().then(function () {
    // const urlQuery = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr + "?unspentOnly=true&includeScript=true"
    // const txrefs = res.data.txrefs
    // const unconfirmed_txrefs = res.data.unconfirmed_txrefs

    numOfConfirmations = 1;
    urlQuery = "https://chain.so/api/v2/get_tx_unspent/BTCTEST/" + addr + "/" + numOfConfirmations;
    return axios.get(urlQuery);
  }).then(function (_resp) {
    res = _resp;
    unspentOutputs = res.data.data.txs;
    // console.log(urlQuery);

    return unspentOutputs;
  });
};