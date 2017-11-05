'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildContract = undefined;

var _rawRequest = require('../common/rawRequest');

var _atomicSwapContract = require('./atomic-swap-contract');

var _feePerKb = require('../common/fee-per-kb');

var _signTransaction = require('../common/sign-transaction');

var _addressUtil = require('../common/address-util');

var _buildRefund = require('../common/build-refund');

var _config = require('../config/config');

var Transaction = require('bitcore').Transaction;
var Address = require('bitcore').Address;
var Script = require('bitcore').Script;

var buildContract = exports.buildContract = async function buildContract(them, amount, lockTime, secretHash) {
  var refundAddr = new Address((await (0, _rawRequest.getRawChangeAddress)()));
  var refundAddressHash = refundAddr.toJSON().hash;
  var themHash = new Address(them).toJSON().hash;

  var contract = (0, _atomicSwapContract.atomicSwapContract)(refundAddressHash, themHash, lockTime, secretHash);

  var contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(contract.toHex(), _config.configuration.network);
  var contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);
  var feePerKb = await (0, _feePerKb.getFeePerKb)();

  var transaction = new Transaction().fee(+amount * 100000000);
  var output = Transaction.Output({
    script: contractP2SHPkScript,
    satoshis: amount * 100000000
  });
  transaction.addOutput(output);
  var contractFee = void 0;
  var contractTx = void 0;
  var fundRawTx = void 0;

  try {
    fundRawTx = await (0, _rawRequest.fundRawTransaction)(transaction.toString(), feePerKb);
  } catch (fundErr) {
    throw new Error(fundErr);
  }

  try {
    contractFee = fundRawTx.data.result.fee;
    contractTx = await (0, _signTransaction.signTransaction)(fundRawTx.data.result.hex);
  } catch (signErr) {
    throw new Error(signErr);
  }

  var t = new Transaction(contractTx.hex);
  var contractTxHash = t.hash;

  // TODO build REFUND !
  await (0, _buildRefund.buildRefund)(contract, contractTx);

  return {
    contract: contract,
    contractP2SH: contractP2SH,
    contractP2SHPkScript: contractP2SHPkScript,
    contractTxHash: contractTxHash,
    contractTx: contractTx,
    contractFee: contractFee
  };
};