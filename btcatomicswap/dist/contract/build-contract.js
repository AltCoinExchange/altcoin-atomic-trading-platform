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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Transaction = require('bitcore').Transaction;
var Address = require('bitcore').Address;
var Script = require('bitcore').Script;
var PrivateKey = require('bitcore').PrivateKey;

var buildContract = exports.buildContract = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(them, amount, lockTime, secretHash, privateKey) {
    var PK, refundAddr, themAddr, contract, contractP2SH, contractP2SHPkScript, contractTx, value, output, signitures, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, signiture, contractTxHash, contractFee, _ref2, refundFee, refundTx;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
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

            _context.next = 12;
            return (0, _fundTransaction.fundTransaction)(refundAddr, contractTx);

          case 12:

            //SIGN TRANSACTION
            signitures = contractTx.getSignatures(privateKey);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 16;

            for (_iterator = signitures[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              signiture = _step.value;

              contractTx.applySignature(signiture);
            }

            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](16);
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
            contractTxHash = contractTx.hash;
            contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();
            _context.next = 36;
            return (0, _buildRefund.buildRefund)(contract.toHex(), contractTx.toString(), privateKey);

          case 36:
            _ref2 = _context.sent;
            refundFee = _ref2.refundFee;
            refundTx = _ref2.refundTx;
            return _context.abrupt('return', {
              contract: contract,
              contractP2SH: contractP2SH,
              contractP2SHPkScript: contractP2SHPkScript,
              contractTxHash: contractTxHash,
              contractTx: contractTx,
              contractFee: contractFee,
              refundTx: refundTx,
              refundFee: refundFee
            });

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[16, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function buildContract(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();