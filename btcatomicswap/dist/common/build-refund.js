'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRefund = undefined;

var _addressUtil = require('./address-util');

var _config = require('../config/config');

var _rawRequest = require('./rawRequest');

var _extractAtomicSwapContract = require('../contract/extract-atomic-swap-contract');

var _scriptUtil = require('./script-util');

var _secretHash = require('./secret-hash');

var _sizeest = require('./sizeest');

var Address = require('bitcore').Address;
var Transaction = require('bitcore').Transaction;
var Script = require('bitcore').Script;

var buildRefund = exports.buildRefund = async function buildRefund(contract, contractTx) {
  var contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(contract.toHex(), _config.configuration.network);
  var contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);
  var contractTxHash = contractTx.hex;
  // contractOutPoint todo

  var refundAddress = await (0, _rawRequest.getRawChangeAddress)();
  var refundOutScript = _scriptUtil.ScriptUtil.payToPubKeyHashScript((0, _secretHash.hash160)(refundAddress));
  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(contract);
  var refundAddr = _addressUtil.AddressUtil.NewAddressPubKeyHash(pushes.refundHash160, _config.configuration.network);

  var refundTx = new Transaction();
  refundTx.lockUntilDate(pushes.lockTime);
  refundTx.addOutput(Transaction.Output({
    script: refundOutScript,
    satoshis: 0 // ammount set bellow
  }));

  var refundSize = (0, _sizeest.estimateRefundSerializeSize)(contract, refundTx.outputs);

  // const refundSize; TODO
  // const refundFee; TODO

};