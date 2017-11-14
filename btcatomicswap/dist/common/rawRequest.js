'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnspentOutputs = exports.estimateFee = exports.fundRawTransaction = exports.getRawChangeAddress = undefined;

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
    console.log('err', err);
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

var getUnspentOutputs = exports.getUnspentOutputs = async function getUnspentOutputs(addr) {
  // const urlQuery = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr + "?unspentOnly=true&includeScript=true"
  // const txrefs = res.data.txrefs
  // const unconfirmed_txrefs = res.data.unconfirmed_txrefs

  var numOfConfirmations = 1;
  var urlQuery = "https://chain.so/api/v2/get_tx_unspent/BTCTEST/" + addr + "/" + numOfConfirmations;
  var res = await axios.get(urlQuery);
  console.log(6);
  console.log(res);
  console.log("----------------------------");
  console.log(res.data);
  console.log("----------------------------");
  console.log(res.data.data.txs);

  var unspentOutputs = res.data.data.txs;
  // console.log(urlQuery);
  return unspentOutputs;
};