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

var buildContract = exports.buildContract = async function buildContract(them, amount, lockTime, secretHash, privateKey) {
  var PK = PrivateKey.fromWIF(privateKey);
  var refundAddr = PK.toPublicKey().toAddress(_config.configuration.network);

  var themAddr = new Address(them);

  var contract = (0, _atomicSwapContract.atomicSwapContract)(refundAddr.toJSON().hash, themAddr.toJSON().hash, lockTime, secretHash);

  var contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(contract.toHex(), _config.configuration.network);
  var contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);

  var contractTx = new Transaction();
  var value = +(+amount * 100000000).toFixed(8); //todo use bignumber
  var output = Transaction.Output({
    script: contractP2SHPkScript,
    satoshis: value
  });
  contractTx.addOutput(output);

  await (0, _fundTransaction.fundTransaction)(refundAddr, contractTx);

  //SIGN TRANSACTION
  var signitures = contractTx.getSignatures(privateKey);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = signitures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var signiture = _step.value;

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

  var contractTxHash = contractTx.hash;
  var contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();

  var _ref = await (0, _buildRefund.buildRefund)(contract.toHex(), contractTx.toString(), privateKey),
      refundFee = _ref.refundFee,
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
};