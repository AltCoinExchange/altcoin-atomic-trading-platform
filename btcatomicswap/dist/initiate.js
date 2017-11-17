'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiate = undefined;

var initiate = exports.initiate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(them, amount, privateKey) {
    var _generateSecret, secret, secretHash, lockTime, b, rawTx;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _generateSecret = (0, _secretHash.generateSecret)(), secret = _generateSecret.secret, secretHash = _generateSecret.secretHash;
            lockTime = (0, _unixTs.getUnixTimeFor2Days)();
            _context.next = 4;
            return (0, _buildContract.buildContract)(them, amount, lockTime, secretHash, privateKey);

          case 4:
            b = _context.sent;
            _context.next = 7;
            return (0, _publicTx.publishTx)(b.contractTx.toString());

          case 7:
            rawTx = _context.sent;
            return _context.abrupt('return', {
              secret: secret,
              secretHash: secretHash,
              fee: b.contractFee,
              contract: b.contractP2SH.toString(),
              contractHex: b.contract.toHex(),
              contractTx: b.contractTx.hash,
              contractTxHex: b.contractTx.toString(),
              rawTx: rawTx
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initiate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _buildContract = require('./contract/build-contract');

var _secretHash = require('./common/secret-hash');

var _unixTs = require('./common/unix-ts');

var _publicTx = require('./common/public-tx');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
