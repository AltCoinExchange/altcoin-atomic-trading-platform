'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signTransaction = undefined;

var _config = require('../config/config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var signTransaction = exports.signTransaction = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              rpc.signRawTransaction(tx, function (c, e) {
                resolve(e.result);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function signTransaction(_x) {
    return _ref.apply(this, arguments);
  };
}();