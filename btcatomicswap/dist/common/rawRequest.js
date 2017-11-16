'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnspentOutputs = exports.estimateFee = exports.fundRawTransaction = exports.getRawChangeAddress = undefined;

var _config = require('../config/config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');


var url = _config.configuration.protocol + '://' + _config.configuration.user + ':' + _config.configuration.pass + '@' + _config.configuration.host + ':' + _config.configuration.port;

var getRawChangeAddress = exports.getRawChangeAddress = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              "method": "getrawchangeaddress",
              "rpcuser": _config.configuration.user,
              "rpcpassword": _config.configuration.pass
            };
            _context.prev = 1;
            _context.next = 4;
            return axios.post(url, data, {
              auth: {
                username: _config.configuration.user,
                password: _config.configuration.pass
              }
            });

          case 4:
            response = _context.sent;
            return _context.abrupt('return', response.data.result);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            console.log('err', _context.t0);
            return _context.abrupt('return', null);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getRawChangeAddress() {
    return _ref.apply(this, arguments);
  };
}();

/**
 *
 * @param tx
 * @param feePerKb
 * @returns fundedTransaction, fee
 */
var fundRawTransaction = exports.fundRawTransaction = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tx, feePerKb) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.post(url, {
              "rpcuser": _config.configuration.user,
              "rpcpassword": _config.configuration.pass,
              "method": "fundrawtransaction",
              "params": [tx, { "feeRate": feePerKb }]
            }, {
              auth: {
                username: _config.configuration.user,
                password: _config.configuration.pass
              }
            });

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);
            throw new Error(_context2.t0);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 6]]);
  }));

  return function fundRawTransaction(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var estimateFee = exports.estimateFee = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.post(url, {
              "rpcuser": _config.configuration.user,
              "rpcpassword": _config.configuration.pass,
              "method": "estimatesmartfee",
              "params": [6]
            }, {
              auth: {
                username: _config.configuration.user,
                password: _config.configuration.pass
              }
            });

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function estimateFee() {
    return _ref3.apply(this, arguments);
  };
}();

var getUnspentOutputs = exports.getUnspentOutputs = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(addr) {
    var numOfConfirmations, urlQuery, res, unspentOutputs;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // const urlQuery = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr + "?unspentOnly=true&includeScript=true"
            // const txrefs = res.data.txrefs
            // const unconfirmed_txrefs = res.data.unconfirmed_txrefs

            numOfConfirmations = 1;
            urlQuery = "https://chain.so/api/v2/get_tx_unspent/BTCTEST/" + addr + "/" + numOfConfirmations;
            _context4.next = 4;
            return axios.get(urlQuery);

          case 4:
            res = _context4.sent;
            unspentOutputs = res.data.data.txs;
            // console.log(urlQuery);

            return _context4.abrupt('return', unspentOutputs);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getUnspentOutputs(_x3) {
    return _ref4.apply(this, arguments);
  };
}();