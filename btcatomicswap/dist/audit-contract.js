'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditContract = undefined;

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _addressUtil = require('./common/address-util');

var Script = require('bitcore').Script;
var Transaction = require('bitcore').Transaction;

var auditContract = exports.auditContract = function auditContract(ct, tx) {

  var contract = new Script(ct);
  var contractScriptHashOut = contract.toScriptHashOut();
  var contractAddress = contractScriptHashOut.toAddress();
  var contractAddressString = contractAddress.toJSON().hash;

  var transaction = new Transaction(tx);

  var hasTxOut = transaction.toJSON().outputs.find(function (output) {
    var script = new Script(output.script);
    var address = script.toAddress('testnet');
    var addressHash = address.toJSON().hash;
    return addressHash === contractAddressString;
  });

  if (!hasTxOut) {
    console.error('transaction does not contain the secret');
    return;
  }

  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(ct);

  var recipientAddrString = pushes.recipientHash.replace('0x', '');
  var recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');

  var refundAddressString = pushes.refundHash160.replace('0x', '');
  var refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddressString, 'testnet');

  console.log('Contract address:       ', _addressUtil.AddressUtil.NewAddressScriptHash(ct, 'testnet').toString());
  console.log('Contract value:         ', hasTxOut.satoshis / 100000000 + ' BTC');
  console.log('Recipient address:      ', recipientAddress.toString());
  console.log('Authors refund address: ', refundAddress.toString());
  console.log('\n');
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('\n');
  console.log('Locktime:               ', new Date(pushes.lockTime * 1000));
};