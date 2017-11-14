'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundTransaction = undefined;

var _rawRequest = require('./rawRequest');

var UnspentOutput = require('bitcore').Transaction.UnspentOutput;

var fundTransaction = exports.fundTransaction = async function fundTransaction(addr, tx) {
  var unspentOutputs = await (0, _rawRequest.getUnspentOutputs)(addr.toString());
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = unspentOutputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var output = _step.value;


      //BLOCKCYPHER
      // let utxo = new UnspentOutput({
      //   "txId" : output.tx_hash,
      //   "outputIndex" : output.tx_output_n,
      //   "address" : addr,
      //   "script" : output.script,
      //   "satoshis" : output.value
      // });

      //CHAIN.SO
      var utxo = new UnspentOutput({
        'txId': output.txid,
        'outputIndex': output.output_no,
        'address': addr,
        'script': output.script_hex,
        'satoshis': output.value * 100000000
      });

      //HINT: utxo can be a instance of UnspentOutput or a object with the necessery parametars
      tx.from(utxo);
      if (tx._getOutputAmount() < tx._getInputAmount()) {
        break;
      }
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

  if (tx._getOutputAmount() > tx._getInputAmount()) {
    throw new Error('insufficent funds');
  }

  // TODO: feejevi
  // console.log("**tx.getFee() ", tx.getFee());

  tx.change(addr);

  return tx;
};