'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildContract = undefined;

var _addressUtil = require('../common/address-util');

var _buildRefund = require('../common/build-refund');

var _fundTransaction = require('../common/fund-transaction');

var _config = require('../config/config');

var _atomicSwapContract = require('./atomic-swap-contract');

var Transaction = require('bitcore').Transaction;
var Address = require('bitcore').Address;
var Script = require('bitcore').Script;
var PrivateKey = require('bitcore').PrivateKey;

var buildContract = exports.buildContract = function buildContract(them, amount, lockTime, secretHash, privateKey) {
  var PK, refundAddr, themAddr, contract, contractP2SH, contractP2SHPkScript, contractTx, value, output, signitures, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, signiture, contractTxHash, contractFee, _ref, refundFee, refundTx;

  return Promise.resolve().then(function () {
    PK = PrivateKey.fromWIF(privateKey);
    refundAddr = PK.toPublicKey().toAddress(_config.configuration.network);
    themAddr = new Address(them);
    contract = (0, _atomicSwapContract.atomicSwapContract)(refundAddr.toJSON().hash, themAddr.toJSON().hash, lockTime, secretHash);
    contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(contract.toHex(), _config.configuration.network);
    contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);
    contractTx = new Transaction();
    value = Math.round(amount * 100000000);
    // console.log(value);

    output = Transaction.Output({
      script: contractP2SHPkScript,
      satoshis: value
    });

    contractTx.addOutput(output);

    return (0, _fundTransaction.fundTransaction)(refundAddr, contractTx);
  }).then(function () {

    //SIGN TRANSACTION
    signitures = contractTx.getSignatures(privateKey);
    _iteratorNormalCompletion = true;
    _didIteratorError = false;
    _iteratorError = undefined;

    try {
      for (_iterator = signitures[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        signiture = _step.value;

        contractTx.applySignature(signiture);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    contractTxHash = contractTx.hash;
    contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();
    return (0, _buildRefund.buildRefund)(contract.toHex(), contractTx.toString(), privateKey);
  }).then(function (_resp) {
    _ref = _resp;
    refundFee = _ref.refundFee;
    refundTx = _ref.refundTx;


    return {
      contract: contract,
      contractP2SH: contractP2SH,
      contractP2SHPkScript: contractP2SHPkScript,
      contractTxHash: contractTxHash,
      contractTx: contractTx,
      contractFee: contractFee,
      refundTx: refundTx,
      refundFee: refundFee
    };
  });
};