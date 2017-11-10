'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refund = refund;

var _refundP2SHContract = require('../contract/refund-P2SH-contract');

var _rawRequest = require('./rawRequest');

var _extractAtomicSwapContract = require('../contract/extract-atomic-swap-contract');

var _createSig = require('./createSig');

var _addressUtil = require('./address-util');

var _config = require('../config/config');

var _publicTx = require('./public-tx.js');

var _feePerKb = require('./fee-per-kb');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;

var Transaction = require('bitcore').Transaction;

var BufferReader = require('bitcore').encoding.BufferReader;

async function refund(strCt, strCtTx, secret) {

  // TODO: change strCt, strCtTx to ct, ctTx
  var contract = new Script(strCt);
  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);

  if (!pushes) {
    console.log("contract is not an atomic swap script recognized by this tool");
    return;
  }

  var ctTx = new Transaction(strCtTx);

  var refundAddrString = pushes.refundHash.replace('0x', '');
  var refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddrString, 'testnet');

  var contractP2SH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, _config.configuration.network);

  var ctTxOutIdx = -1;

  for (var i = 0; i < ctTx.outputs.length; i++) {
    var _script = new Script(ctTx.outputs[i].script);
    var address = _script.toAddress(_config.configuration.network);
    var addressHash = address.toJSON().hash;

    if (addressHash === contractP2SH.toJSON().hash) {
      ctTxOutIdx = i;
      break;
    }
  }

  if (ctTxOutIdx == -1) {
    console.log("transaction does not contain a contract output");
    return;
  }

  // TODO:  "getrawchangeaddres" + erroe
  var addr = new Address((await getChangeAddress()));

  var outScript = Script.buildPublicKeyHashOut(addr);
  var amount = ctTx.outputs[ctTxOutIdx].satoshis - 0.0005 * 100000000;

  // https://bitcoin.org/en/developer-examples#offline-signing
  var refundTx = new Transaction();
  var lockTime = new BufferReader(pushes.lockTime).readUInt32LE();
  // const lockTime = new BufferReader(pushes.lockTime)
  console.log(lockTime);
  refundTx.lockUntilDate(lockTime);

  // TODO: "refund output value of %v is dust"
  var output = Transaction.Output({
    script: outScript,
    satoshis: amount
  });
  refundTx.addOutput(output);

  var input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    sequenceNumber: 0,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  });

  refundTx.uncheckedAddInput(input);

  var inputIndex = 0;

  var _ref = await (0, _createSig.createSig)(refundTx, inputIndex, contract, refundAddress),
      sig = _ref.sig,
      pubKey = _ref.pubKey;

  var script = (0, _refundP2SHContract.refundP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString());

  refundTx.inputs[0].setScript(script);

  console.log("**refund transaction  ", refundTx);
  console.log("**refund fee");
  // console.log(refundTx.verify());
  var res = await (0, _publicTx.publishTx)(refundTx.toString());
  // console.log(res);


  return refundTx;
}

var getChangeAddress = async function getChangeAddress() {
  var refundAddr = await (0, _rawRequest.getRawChangeAddress)();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
