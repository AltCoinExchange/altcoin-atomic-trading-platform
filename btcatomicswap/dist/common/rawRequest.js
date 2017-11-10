'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateFee = exports.fundRawTransaction = exports.getRawChangeAddress = undefined;

var _config = require('../config/config');

var axios = require('axios');


var url = _config.configuration.protocol + '://' + _config.configuration.user + ':' + _config.configuration.pass + '@' + _config.configuration.host + ':' + _config.configuration.port;

var getRawChangeAddress = exports.getRawChangeAddress = async function getRawChangeAddress() {
  var data = {
    "method": "getrawchangeaddress",
    "rpcuser": _config.configuration.user,
    "rpcpassword": _config.configuration.pass
  };
  try {
    var response = await axios.post(url, data, {
      auth: {
        username: _config.configuration.user,
        password: _config.configuration.pass
      }
    });
    return response.data.result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 *
 * @param tx
 * @param feePerKb
 * @returns fundedTransaction, fee
 */
var fundRawTransaction = exports.fundRawTransaction = async function fundRawTransaction(tx, feePerKb) {
  try {
    return await axios.post(url, {
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
};

var estimateFee = exports.estimateFee = async function estimateFee() {
  return await axios.post(url, {
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
};
