'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildContract = undefined;

var _rawRequest = require('../common/rawRequest');

var _atomicSwapContract = require('./atomic-swap-contract');

var _feePerKb = require('../common/fee-per-kb');

var _signTransaction = require('../common/sign-transaction');

var _secretHash = require('../common/secret-hash');

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

  try {
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

    try {
      var fundRawTx = await (0, _rawRequest.fundRawTransaction)(transaction.toString(), feePerKb);
      var contractFee = fundRawTx.data.result.fee;
      var contractTx = await (0, _signTransaction.signTransaction)(fundRawTx.data.result.hex);
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
    } catch (fundErr) {
      if (fundErr && fundErr.response) {
        console.log('fundErr', fundErr.response.data, 'fundErr');
      } else {
        console.log('fundErr', fundErr, 'fundErr');
      }
    }
  } catch (err) {
    console.log('err: ', err);
  }
};