'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redeem = redeem;

var _addressUtil = require('./common/address-util');

var _createSig = require('./common/createSig');

var _rawRequest = require('./common/rawRequest');

var _config = require('./config/config');

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _redeemP2SHContract = require('./contract/redeem-P2SH-contract');

var _publicTx = require('./common/public-tx');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;
var Transaction = require('bitcore').Transaction;

var util = require('util');

async function redeem(strCt, strCtTx, secret, privateKey) {

  // TODO: change strCt, strCtTx to ct, ctTx
  var contract = new Script(strCt);
  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);

  if (!pushes) {
    console.log("contract is not an atomic swap script recognized by this tool");
    return;
  }

  var ctTx = new Transaction(strCtTx);

  var recipientAddrString = pushes.recipientHash.replace('0x', '');
  var recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');
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
  var redeemTx = new Transaction();

  // TODO: "redeem output value of %v is dust"
  var output = Transaction.Output({
    script: outScript,
    satoshis: amount
  });
  redeemTx.addOutput(output);

  var input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  });

  redeemTx.uncheckedAddInput(input);

  var inputIndex = 0;

  var _ref = await (0, _createSig.createSig)(redeemTx, inputIndex, contract, recipientAddress, privateKey),
      sig = _ref.sig,
      pubKey = _ref.pubKey;

  var script = (0, _redeemP2SHContract.redeemP2SHContract)(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);

  redeemTx.inputs[0].setScript(script);

  console.log("**redeem transaction  ", redeemTx);
  var res = await (0, _publicTx.publishTx)(redeemTx.toString());

  return {
    redeemTx: redeemTx,
    rawTx: res
  };
}

var getChangeAddress = async function getChangeAddress() {
  var refundAddr = await (0, _rawRequest.getRawChangeAddress)();
  return refundAddr;
};