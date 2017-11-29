'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeePerKb = undefined;

var _config = require('../config/config');

var _rawRequest = require('./rawRequest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RpcClient = require('bitcoind-rpc');
var rpc = new RpcClient(_config.configuration);

var getFeePerKb = exports.getFeePerKb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var estimateRawResp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _rawRequest.estimateFee)();

          case 2:
            estimateRawResp = _context.sent;
            return _context.abrupt('return', estimateRawResp.data.result.feerate);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getFeePerKb() {
    return _ref.apply(this, arguments);
  };
}();
