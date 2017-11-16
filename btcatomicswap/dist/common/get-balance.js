'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBalance = undefined;

var _config = require('../config/config');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

var RpcClient = require('bitcoind-rpc');
var Address = require('bitcore').Address;
var rpc = new RpcClient(_config.configuration);

// export async function createSig(reedemTx, inputIndex, contract, recipientAddress){
//     const wif = await getPrivKey(recipientAddress)
//     const WIF = new PrivateKey(wif)
//     const sighashType = 1
//     const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract)
//     const pubKey = WIF.toPublicKey()
//     return {sig, pubKey}
// }
var getBalance = exports.getBalance = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        var balance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getFunc('getBalance', [address, 1]);

                    case 2:
                        balance = _context.sent;
                        return _context.abrupt('return', balance);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getBalance(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getFunc = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(func, params) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            rpc[func].apply(rpc, _toConsumableArray(params).concat([function (c, e) {
                                resolve(e.result);
                            }]));
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getFunc(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();
