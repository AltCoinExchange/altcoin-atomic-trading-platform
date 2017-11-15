'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redeem = redeem;

var _addressUtil = require('./common/address-util');

var _createSig = require('./common/createSig');

var _publicTx = require('./common/public-tx');

var _rawRequest = require('./common/rawRequest');

var _config = require('./config/config');

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _redeemP2SHContract = require('./contract/redeem-P2SH-contract');

var _feePerKb = require('./common/fee-per-kb');

var _sizeest = require('./common/sizeest');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;
var Transaction = require('bitcore').Transaction;
var PrivateKey = require('bitcore').PrivateKey;

function redeem(strCt, strCtTx, secret, privateKey) {
  var contract, pushes, ctTx, recipientAddrString, recipientAddress, contractP2SH, ctTxOutIdx, i, _script, address, addressHash, PK, newRawAddr, redeemToAddr, outScript, redeemTx, output, feePerKb, redeemSerializeSize, fee, amount, input, inputIndex, _ref, sig, pubKey, script, res;

  return Promise.resolve().then(function () {

    // TODO: change strCt, strCtTx to ct, ctTx
    contract = new Script(strCt);
    pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);


    if (!pushes) {
      console.log("contract is not an atomic swap script recognized by this tool");
    } else {
      ctTx = new Transaction(strCtTx);
      recipientAddrString = pushes.recipientHash.replace('0x', '');
      recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');
      contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, _config.configuration.network);
      ctTxOutIdx = -1;


      for (i = 0; i < ctTx.outputs.length; i++) {
        _script = new Script(ctTx.outputs[i].script);
        address = _script.toAddress(_config.configuration.network);
        addressHash = address.toJSON().hash;


        if (addressHash === contractP2SH.toJSON().hash) {
          ctTxOutIdx = i;
          break;
        }
      }

      if (ctTxOutIdx == -1) {
        console.log("transaction does not contain a contract output");
      } else {
        return Promise.resolve().then(function () {
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

          return (0, _feePerKb.getFeePerKb)();
        }).then(function (_resp) {
          feePerKb = _resp;
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
          return (0, _createSig.createSig)(redeemTx, inputIndex, contract, recipientAddress, privateKey);
        }).then(function (_resp) {
          _ref = _resp;
          sig = _ref.sig;
          pubKey = _ref.pubKey;
          script = (0, _redeemP2SHContract.redeemP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);


          redeemTx.inputs[0].setScript(script);

          res = void 0;
          return Promise.resolve().then(function () {
            return (0, _publicTx.publishTx)(redeemTx.toString());
          }).then(function (_resp) {
            res = _resp;
          }).catch(function (e) {
            console.log(e);
          });
        }).then(function () {

          return {
            redeemTx: redeemTx.toString(),
            rawTx: res
          };
        });
      }
    }
  }).then(function () {});
}