'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fundTransaction = undefined;

var _rawRequest = require('./rawRequest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UnspentOutput = require('bitcore').Transaction.UnspentOutput;

var fundTransaction = exports.fundTransaction = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(addr, tx) {
    var unspentOutputs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, output, value, utxo;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _rawRequest.getUnspentOutputs)(addr.toString());

          case 2:
            unspentOutputs = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = unspentOutputs[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

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

            if (!(tx._getOutputAmount() < tx._getInputAmount())) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('break', 18);

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            if (!(tx._getOutputAmount() > tx._getInputAmount())) {
              _context.next = 34;
              break;
            }

            throw new Error('insufficent funds');

          case 34:

            // TODO: feejevi
            // console.log("**tx.getFee() ", tx.getFee());

            tx.change(addr);

            return _context.abrupt('return', tx);

          case 36:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function fundTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();