'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRefund = buildRefund;

var _refundP2SHContract = require('../contract/refund-P2SH-contract');

var _rawRequest = require('./rawRequest');

var _extractAtomicSwapContract = require('../contract/extract-atomic-swap-contract');

var _createSig = require('./createSig');

var _addressUtil = require('./address-util');

var _config = require('../config/config');

var _publicTx = require('./public-tx.js');

var _feePerKb = require('./fee-per-kb');

var _sizeest = require('./sizeest');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;

var Transaction = require('bitcore').Transaction;

var BufferReader = require('bitcore').encoding.BufferReader;

function buildRefund(strCt, strCtTx, privateKey) {
  var contract, pushes, ctTx, refundAddrString, refundAddress, contractP2SH, ctTxOutIdx, i, _script, address, addressHash, addr, outScript, refundTx, lockTime, output, feePerKb, redeemSerializeSize, refundFee, amount, input, inputIndex, _ref, sig, pubKey, script;

  return Promise.resolve().then(function () {

    // TODO: change strCt, strCtTx to ct, ctTx
    contract = new Script(strCt);
    pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);


    if (!pushes) {
      console.log("contract is not an atomic swap script recognized by this tool");
    } else {
      ctTx = new Transaction(strCtTx);
      refundAddrString = pushes.refundHash160.replace('0x', '');
      refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddrString, 'testnet');
      contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, _config.configuration.network);
      ctTxOutIdx = -1;


      // TODO:  "getrawchangeaddres" + erroe
      // const addr = new Address(await getChangeAddress())
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

          return (0, _feePerKb.getFeePerKb)();
        }).then(function (_resp) {
          feePerKb = _resp;
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
          return (0, _createSig.createSig)(refundTx, inputIndex, contract, refundAddress, privateKey);
        }).then(function (_resp) {
          _ref = _resp;
          sig = _ref.sig;
          pubKey = _ref.pubKey;
          script = (0, _refundP2SHContract.refundP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString());


          refundTx.inputs[0].setScript(script);

          return {
            refundFee: refundFee,
            refundTx: refundTx
          };
        });
      }
    }
  }).then(function () {});
}

var getChangeAddress = function getChangeAddress() {
  var refundAddr;
  return Promise.resolve().then(function () {
    return (0, _rawRequest.getRawChangeAddress)();
  }).then(function (_resp) {
    refundAddr = _resp;
    // const addressHex = new Buffer(refundAddr, 'hex');

    return refundAddr;
  });
};