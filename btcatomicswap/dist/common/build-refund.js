'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRefund = undefined;

var _refundP2SHContract = require('../contract/refund-P2SH-contract');

var _rawRequest = require('./rawRequest');

var _extractAtomicSwapContract = require('../contract/extract-atomic-swap-contract');

var _createSig = require('./createSig');

var _addressUtil = require('./address-util');

var _config = require('../config/config');

var _publicTx = require('./public-tx.js');

var _feePerKb = require('./fee-per-kb');

var _sizeest = require('./sizeest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;

var Transaction = require('bitcore').Transaction;

var BufferReader = require('bitcore').encoding.BufferReader;

var buildRefund = exports.buildRefund = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(strCt, strCtTx, privateKey) {
    var contract, pushes, ctTx, refundAddrString, refundAddress, contractP2SH, ctTxOutIdx, i, _script, address, addressHash, addr, outScript, refundTx, lockTime, output, feePerKb, redeemSerializeSize, refundFee, amount, input, inputIndex, _ref2, sig, pubKey, script;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('buildRefund');

            // TODO: change strCt, strCtTx to ct, ctTx
            contract = new Script(strCt);
            pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);

            if (pushes) {
              _context.next = 6;
              break;
            }

            console.log("contract is not an atomic swap script recognized by this tool");
            return _context.abrupt('return');

          case 6:
            ctTx = new Transaction(strCtTx);
            refundAddrString = pushes.refundHash160.replace('0x', '');
            refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddrString, 'testnet');
            contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, _config.configuration.network);
            ctTxOutIdx = -1;
            i = 0;

          case 12:
            if (!(i < ctTx.outputs.length)) {
              _context.next = 22;
              break;
            }

            _script = new Script(ctTx.outputs[i].script);
            address = _script.toAddress(_config.configuration.network);
            addressHash = address.toJSON().hash;

            if (!(addressHash === contractP2SH.toJSON().hash)) {
              _context.next = 19;
              break;
            }

            ctTxOutIdx = i;
            return _context.abrupt('break', 22);

          case 19:
            i++;
            _context.next = 12;
            break;

          case 22:
            if (!(ctTxOutIdx == -1)) {
              _context.next = 25;
              break;
            }

            console.log("transaction does not contain a contract output");
            return _context.abrupt('return');

          case 25:

            // TODO:  "getrawchangeaddres" + erroe
            // const addr = new Address(await getChangeAddress())
            addr = "mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ";
            outScript = Script.buildPublicKeyHashOut(addr);

            // https://bitcoin.org/en/developer-examples#offline-signing

            refundTx = new Transaction();
            lockTime = new BufferReader(pushes.lockTime).readUInt32LE();

            refundTx.lockUntilDate(lockTime);

            // TODO: "refund output value of %v is dust"
            output = Transaction.Output({
              script: outScript,
              satoshis: 0
            });


            refundTx.addOutput(output);
            console.log('aaaa');
            _context.next = 35;
            return (0, _feePerKb.getFeePerKb)();

          case 35:
            feePerKb = _context.sent;

            console.log('bbbb');
            redeemSerializeSize = (0, _sizeest.estimateRefundSerializeSize)(contract, refundTx.outputs);
            refundFee = (0, _sizeest.feeForSerializeSize)(feePerKb, redeemSerializeSize) * 100000000;
            amount = ctTx.outputs[ctTxOutIdx].satoshis - refundFee;


            output = Transaction.Output({
              script: outScript,
              satoshis: amount
            });

            refundTx.removeOutput(0);
            refundTx.addOutput(output);

            input = Transaction.Input({
              prevTxId: ctTx.id,
              outputIndex: ctTxOutIdx,
              sequenceNumber: 0,
              script: new Script(ctTx.outputs[ctTxOutIdx].script)
            });


            refundTx.uncheckedAddInput(input);

            inputIndex = 0;
            _context.next = 48;
            return (0, _createSig.createSig)(refundTx, inputIndex, contract, refundAddress, privateKey);

          case 48:
            _ref2 = _context.sent;
            sig = _ref2.sig;
            pubKey = _ref2.pubKey;
            script = (0, _refundP2SHContract.refundP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString());


            refundTx.inputs[0].setScript(script);

            return _context.abrupt('return', {
              refundFee: refundFee,
              refundTx: refundTx
            });

          case 54:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function buildRefund(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getChangeAddress = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var refundAddr;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _rawRequest.getRawChangeAddress)();

          case 2:
            refundAddr = _context2.sent;
            return _context2.abrupt('return', refundAddr);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getChangeAddress() {
    return _ref3.apply(this, arguments);
  };
}();