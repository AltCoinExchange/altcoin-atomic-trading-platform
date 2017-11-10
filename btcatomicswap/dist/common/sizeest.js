"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;

// redeemAtomicSwapSigScriptSize is the worst case (largest) serialize size
// of a transaction input script to redeem the atomic swap contract.  This
// does not include final push for the contract itself.
//
//   - OP_DATA_73
//   - 72 bytes DER signature + 1 byte sighash
//   - OP_DATA_33
//   - 33 bytes serialized compressed pubkey
//   - OP_DATA_32
//   - 32 bytes secret
//   - OP_TRUE
var redeemAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1 + 32 + 1;

// refundAtomicSwapSigScriptSize is the worst case (largest) serialize size
// of a transaction input script that refunds a P2SH atomic swap output.
// This does not include final push for the contract itself.
//
//   - OP_DATA_73
//   - 72 bytes DER signature + 1 byte sighash
//   - OP_DATA_33
//   - 33 bytes serialized compressed pubkey
//   - OP_FALSE
var refundAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1;

// https://github.com/btcsuite/btcwallet/blob/8e723ea45456fc3e6208a399c849aca54a0d959f/wallet/txrules/rules.go#L80
var feeForSerializeSize = exports.feeForSerializeSize = function feeForSerializeSize(relayFeePerKb, txSerializeSize) {
  var fee = relayFeePerKb * txSerializeSize / 1000;
};

var sumOutputSerializeSizes = exports.sumOutputSerializeSizes = function sumOutputSerializeSizes(outputs) {
  var serializeSize = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var output = _step.value;

      serializeSize += output.toBufferWriter().toBuffer().byteLength();
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

  console.log("**sumOutput", serializeSize);
  return serializeSize;
};

// inputSize returns the size of the transaction input needed to include a
// signature script with size sigScriptSize.  It is calculated as:
//
//   - 32 bytes previous tx
//   - 4 bytes output index
//   - Compact int encoding sigScriptSize
//   - sigScriptSize bytes signature script
//   - 4 bytes sequence
var inputSize = exports.inputSize = function inputSize(sigScriptSize) {};

// estimateRedeemSerializeSize returns a worst case serialize size estimates for
// a transaction that redeems an atomic swap P2SH output.
var estimateRedeemSerializeSize = exports.estimateRedeemSerializeSize = function estimateRedeemSerializeSize(contract, txOuts) {};

// estimateRefundSerializeSize returns a worst case serialize size estimates for
// a transaction that refunds an atomic swap P2SH output.
var estimateRefundSerializeSize = exports.estimateRefundSerializeSize = function estimateRefundSerializeSize(contract, txOuts) {
  var contractPush = new Script(contract);
  var contractPushSize = contractPush.toBuffer().length;
};
