'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redeem = redeem;

var _redeemP2SHContract = require('./redeemP2SHContract');

var _rawRequest = require('./common/rawRequest');

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _createSig = require('./common/createSig');

var _secretHash = require('./common/secret-hash');

var Script = require('bitcore').Script;
var Address = require('bitcore').Address;

var Transaction = require('bitcore').Transaction;
var Base58 = require('bitcore').encoding.Base58;
var Base58Check = require('bitcore').encoding.Base58Check;


// const util = require('util')

async function redeem(ct, ctTx, secret) {
  // console.log(ctTx);
  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(ct);
  ctTx = new Transaction(ctTx);
  // console.log(require('util').inspect(Transaction.Output, { depth: null }));
  // console.log(require('util').inspect(ctTx, { depth: null }));
  // console.log(ctTx);
  var hash = pushes.recipientHash.replace('0x', '');
  console.log('hash', hash);

  var encoded = Base58Check.encode(Buffer.from(hash));
  var base58 = Base58.encode(Buffer.from(hash));

  console.log('encoded', encoded);
  console.log('base58', base58);
  console.log(new Address(encoded));
  // const recipientHashString = pushes.recipientHash.replace('0x', '');
  // const recipientHash = new Address(recipientHashString, 'testnet')

  // console.log(new Script(recipientHashString).toScriptHashOut().toAddress());
  // console.log(new Script(recipientHashString).toAddress());
  //const recipientHash = new Address(hash160(recipientHashString), 'testnet')

  // console.log("**recipientHash   ", recipientHash);
  // 0xebcf822c4a2cdb5f6a6b9c4a59b74d66461da581

  // createSig()
  // console.log('address: ', new Script(recipientHashString).toScriptHashOut().toAddress().toJSON());
  //const recipientHash = new Address(hash160(recipientHashString), 'testnet')
  // console.log("**recipientHash   ", recipientHash);
  // createSig()

  var contract = new Script(ct);
  console.log("**Script:   ", contract);
  var contractScriptHashOut = contract.toScriptHashOut();
  var contractAddress = contractScriptHashOut.toAddress();
  var contractAddressString = contractScriptHashOut.toAddress().toJSON().hash;

  // console.log(ctTx.outputs.length);
  // console.log(ctTx.outputs[0]);
  // console.log(ctTx.outputs[0].script);
  var ctTxOutIdx = -1;

  for (var i = 0; i < ctTx.outputs.length; i++) {
    var script = new Script(ctTx.outputs[i].script);
    var address = script.toAddress("testnet");
    var addressHash = address.toJSON().hash;

    // TODO: implement a check to see if its a p2sh and then check the address
    if (addressHash === contractAddressString) {
      ctTxOutIdx = i;
      break;
    }
  }

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

  // const output = Transaction.output({
  //   script: outScript,
  //   satoshis: amount*100000000
  // })
  //
  // const script = redeemP2SHContract(strContract, strSig, strPubkey, strSecret);
  //
  // const input = Transaction.input({
  //   prevTxId: ctTx.id,
  //   outputIndex: ctTxOutIdx,
  //   script:
  // })


  // check the contract
  // return errors.New("contract is not an atomic swap script recognized by this tool")


  // check if the contractTx containes the contract
  // and return the index of the contract
  // return errors.New("transaction does not contain a contract output")

  // const script = redeemP2SHContract(contract, sig, pubkey, secret);
}

var getChangeAddress = async function getChangeAddress() {
  var refundAddr = await (0, _rawRequest.getRawChangeAddress)();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};