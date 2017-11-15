'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundTransaction = undefined;

var _rawRequest = require('./rawRequest');

var UnspentOutput = require('bitcore').Transaction.UnspentOutput;

var fundTransaction = exports.fundTransaction = function fundTransaction(addr, tx) {
  var unspentOutputs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, output, value, utxo;

  return Promise.resolve().then(function () {
    return (0, _rawRequest.getUnspentOutputs)(addr.toString());
  }).then(function (_resp) {
    unspentOutputs = _resp;
    _iteratorNormalCompletion = true;
    _didIteratorError = false;
    _iteratorError = undefined;

    try {
      for (_iterator = unspentOutputs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        output = _step.value;


        //BLOCKCYPHER
        // let utxo = new UnspentOutput({
        //   "txId" : output.tx_hash,
        //   "outputIndex" : output.tx_output_n,
        //   "address" : addr,
        //   "script" : output.script,
        //   "satoshis" : output.value
        // });
        value = Math.round(output.value * 100000000);

        // console.log(output.value * 100000000);
        // console.log(value);
        //CHAIN.SO

        utxo = new UnspentOutput({
          'txId': output.txid,
          'outputIndex': output.output_no,
          'address': addr,
          'script': output.script_hex,
          'satoshis': value
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
  });
};