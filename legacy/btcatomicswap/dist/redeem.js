'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redeem = undefined;

var redeem = exports.redeem = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(strCt, strCtTx, secret, privateKey) {
    var contract, pushes, ctTx, recipientAddrString, recipientAddress, contractP2SH, ctTxOutIdx, i, _script, address, addressHash, PK, newRawAddr, redeemToAddr, outScript, redeemTx, output, feePerKb, redeemSerializeSize, fee, amount, input, inputIndex, _ref2, sig, pubKey, script, res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // TODO: change strCt, strCtTx to ct, ctTx
            contract = new Script(strCt);
            pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);

            if (pushes) {
              _context.next = 5;
              break;
            }

            console.log("contract is not an atomic swap script recognized by this tool");
            return _context.abrupt('return');

          case 5:
            ctTx = new Transaction(strCtTx);
            recipientAddrString = pushes.recipientHash.replace('0x', '');
            recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');
            contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, _config.configuration.network);
            ctTxOutIdx = -1;
            i = 0;

          case 11:
            if (!(i < ctTx.outputs.length)) {
              _context.next = 21;
              break;
            }

            _script = new Script(ctTx.outputs[i].script);
            address = _script.toAddress(_config.configuration.network);
            addressHash = address.toJSON().hash;

            if (!(addressHash === contractP2SH.toJSON().hash)) {
              _context.next = 18;
              break;
            }

            ctTxOutIdx = i;
            return _context.abrupt('break', 21);

          case 18:
            i++;
            _context.next = 11;
            break;

          case 21:
            if (!(ctTxOutIdx == -1)) {
              _context.next = 24;
              break;
            }

            console.log("transaction does not contain a contract output");
            return _context.abrupt('return');

          case 24:
            PK = PrivateKey.fromWIF(privateKey);
            newRawAddr = PK.toPublicKey().toAddress(_config.configuration.network);
            // const addr = new Address(newRawAddr);


            // TODO:  "getrawchangeaddres" + erroe await getChangeAddress()
            // TODO: pass redeemToAddr as parametar

            redeemToAddr = new Address("moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq");
            outScript = Script.buildPublicKeyHashOut(redeemToAddr);

            // https://bitcoin.org/en/developer-examples#offline-signing

            redeemTx = new Transaction();

            // TODO: "redeem output value of %v is dust"

            output = Transaction.Output({
              script: outScript,
              satoshis: 0
            });


            redeemTx.addOutput(output);

            _context.next = 33;
            return (0, _feePerKb.getFeePerKb)();

          case 33:
            feePerKb = _context.sent;
            redeemSerializeSize = (0, _sizeest.estimateRedeemSerializeSize)(contract, redeemTx.outputs);
            fee = (0, _sizeest.feeForSerializeSize)(feePerKb, redeemSerializeSize) * 100000000;
            amount = ctTx.outputs[ctTxOutIdx].satoshis - fee;


            output = Transaction.Output({
              script: outScript,
              satoshis: amount
            });

            redeemTx.removeOutput(0);
            redeemTx.addOutput(output);

            input = Transaction.Input({
              prevTxId: ctTx.id,
              outputIndex: ctTxOutIdx,
              script: new Script(ctTx.outputs[ctTxOutIdx].script)
            });


            redeemTx.uncheckedAddInput(input);

            inputIndex = 0;
            _context.next = 45;
            return (0, _createSig.createSig)(redeemTx, inputIndex, contract, recipientAddress, privateKey);

          case 45:
            _ref2 = _context.sent;
            sig = _ref2.sig;
            pubKey = _ref2.pubKey;
            script = (0, _redeemP2SHContract.redeemP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);


            redeemTx.inputs[0].setScript(script);

            res = void 0;
            _context.prev = 51;
            _context.next = 54;
            return (0, _publicTx.publishTx)(redeemTx.toString());

          case 54:
            res = _context.sent;
            _context.next = 60;
            break;

          case 57:
            _context.prev = 57;
            _context.t0 = _context['catch'](51);

            console.log(_context.t0);

          case 60:
            return _context.abrupt('return', {
              redeemTx: redeemTx.toString(),
              rawTx: res
            });

          case 61:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[51, 57]]);
  }));

  return function redeem(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _addressUtil = require('./common/address-util');

var _createSig = require('./common/createSig');

var _publicTx = require('./common/public-tx');

var _rawRequest = require('./common/rawRequest');

var _config = require('./config/config');

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _redeemP2SHContract = require('./contract/redeem-P2SH-contract');

var _feePerKb = require('./common/fee-per-kb');

var _sizeest = require('./common/sizeest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;
var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;
