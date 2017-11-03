'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redeem = redeem;

var _redeemP2SHContract = require('./contract/redeem-P2SH-contract');

var _rawRequest = require('./common/rawRequest');

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _createSig = require('./common/createSig');

var _secretHash = require('./common/secret-hash');

var _addressUtil = require('./common/address-util');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;

var Transaction = require('bitcore').Transaction;
var Base58 = require('bitcore').encoding.Base58;
var Base58Check = require('bitcore').encoding.Base58Check;

var strPubKey = "03b10e3690bcaf0eae7098ec794666963803bcec5acfbe6a112bc8cdc93797f002";

var util = require('util');

async function redeem(strCt, strCtTx, secret) {

  var contract = new Script(strCt);
  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(strCt);

  var ctTx = new Transaction(strCtTx);

  var recipientAddrString = pushes.recipientHash.replace('0x', '');
  var recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');

  var contractSH = _addressUtil.AddressUtil.NewAddressScriptHash(strCt, 'testnet').toString();

  var contractScriptHashOut = contract.toScriptHashOut();
  var contractAddress = contractScriptHashOut.toAddress();
  var contractAddressString = contractScriptHashOut.toAddress().toJSON().hash;

  // console.log(ctTx.outputs.length);
  // console.log(ctTx.outputs[0]);
  // console.log(ctTx.outputs[0].script);
  var ctTxOutIdx = -1;

  for (var i = 0; i < ctTx.outputs.length; i++) {
    var script = new Script(ctTx.outputs[i].script);
    var address = script.toAddress(configuration.network);
    var addressHash = address.toJSON().hash;

    // TODO: implement a check to see if its a p2sh and then check the address
    if (addressHash === contractAddressString) {
      ctTxOutIdx = i;
      break;
    }
  }
  console.log(pushes.recipientHash);

  console.log(ctTxOutIdx);
  // let addr = await getChangeAddress()
  var addr = new Address((await getChangeAddress()));
  console.log(addr);
  var outScript = Script.buildPublicKeyHashOut(addr);
  console.log(outScript);

  // TODO:
  // console.log(ctTx.outputs[ctTxOutIdx].satoshis);
  var amount = ctTx.outputs[ctTxOutIdx].satoshis;
  console.log(amount);
  var reedemTx = new Transaction();
  console.log(reedemTx);
  var output = Transaction.Output({
    script: outScript,
    satoshis: amount
  });
  reedemTx.addOutput(output);
  console.log(reedemTx);
  // createSig(recipientAddress)
  console.log("---------");
  // console.log(Transaction.Sighash);
  var tAddr = "n4Fc4SbP7tqhCVch1eVS8sj9E919X1SUqS";
  // const script = redeemP2SHContract(strContract, strSig, strPubkey, strSecret);
  //
  var input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  });

  console.log(input);
  console.log(reedemTx.uncheckedAddInput(input));

  var _ref = await (0, _createSig.createSig)(reedemTx, 0, contract, tAddr),
      sig = _ref.sig,
      pubKey = _ref.pubKey;
  // const obj = await createSig(reedemTx, 0, contract, tAddr )
  // console.log(obj);


  console.log(sig);
  console.log(pubKey);
  //
  console.log("**strCt  ", strCt);
  console.log("**Ct  ", contract.toHex());
  console.log("**strCtTx  ", strCtTx);
  console.log("**CtTx  ", ctTx);
  console.log("**Pubkey  ", pubKey.toString());
  // console.log("**strPubkey  ", strPubkey);
  console.log("**secret  ", secret);
  console.log("**verify  ", sig);
  console.log("**sig  ", sig.toString());

  // const script = redeemP2SHContract(strCt, sig, pubKey.toString(), secret);

  // check the contract
  // return errors.New("contract is not an atomic swap script recognized by this tool")


  // check if the contractTx containes the contract
  // and return the index of the contract
  // return errors.New("transaction does not contain a contract output")
}

var getChangeAddress = async function getChangeAddress() {
  var refundAddr = await (0, _rawRequest.getRawChangeAddress)();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};