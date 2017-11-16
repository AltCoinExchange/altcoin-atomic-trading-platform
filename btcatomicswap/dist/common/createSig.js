'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSig = undefined;

var _config = require('../config/config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

var createSig = exports.createSig = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
    var wif, WIF, sighashType, sig, pubKey;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wif = privateKey;
            WIF = new PrivateKey(wif);
            sighashType = 1;
            sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
            pubKey = WIF.toPublicKey();
            return _context.abrupt('return', { sig: sig, pubKey: pubKey });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createSig(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();