'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.participate = undefined;

var _unixTs = require('./common/unix-ts');

var _buildContract = require('./contract/build-contract');

var _publicTx = require('./common/public-tx');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var participate = exports.participate = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(them, amount, secretHash, privkey) {
    var lockTime, b, rawTx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            lockTime = (0, _unixTs.getUnixTimeFor2Days)();
            _context.next = 3;
            return (0, _buildContract.buildContract)(them, amount, lockTime, secretHash, privkey);

          case 3:
            b = _context.sent;
            _context.next = 6;
            return (0, _publicTx.publishTx)(b.contractTx.toString());

          case 6:
            rawTx = _context.sent;


            console.log('Secret hash:         ', secretHash);
            console.log('Contract fee:        ', b.contractFee);
            console.log('Refund fee:          ', '-- TODO --');
            console.log('\n');
            console.log('Contract:            ', '(' + b.contractP2SH.toString() + ')');
            console.log(b.contract.toHex());
            console.log('\n');
            console.log('Contract transaction:', '(' + b.contractTxHash + ')');
            console.log(b.contractTx.hex);
            console.log('\n');
            console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
            console.log(b.refundTx.toString());
            console.log('Published contract transaction: ', rawTx);
            return _context.abrupt('return', {
              fee: b.contractFee,
              contract: b.contractP2SH.toString(),
              contractHex: b.contract.toHex(),
              contractTx: b.contractTx.hash,
              contractTxHex: b.contractTx.toString(),
              rawTx: rawTx
            });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function participate(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
