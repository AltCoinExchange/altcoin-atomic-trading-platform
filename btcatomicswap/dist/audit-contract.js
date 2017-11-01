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

  var hasTxOut = transaction.toJSON().outputs.some(function (output) {
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

  var refundAddressString = pushes.refundHash160.replace('0x', ''); // -> mpRMZoyNoFc3sYfZsvVcfnSvR6B4SYuM2W
  var refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddressString, 'testnet');

  console.log('Contract address:       ', _addressUtil.AddressUtil.NewAddressScriptHash(ct).toString());
  console.log('Contract value:         ', 'todo');
  console.log('Recipient address:      ', recipientAddress.toString());
  console.log('Authors refund address: ', refundAddress.toString());
  console.log('\n');
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('\n');
  console.log('Locktime:               ', new Date(pushes.lockTime * 1000));
};

function toBase16(val) {
  var result = [];
  for (var i = 0; i < val.length; i = i + 2) {
    result.push(parseInt(val[i] + val[i + 1], 16));
  }
  return result;
}

/**
 * TODO GOAL!!!!!
 *
 *

 Contract address:        2Mvyb3QKtiHgwgxYLJin3iQYLN3sDJ3dnjq
 Contract value:          0.01 BTC
 Recipient address:       mvJQhCbsH22Rq32apjuCast1RmY1kTo8G5
 Author's refund address: mpRMZoyNoFc3sYfZsvVcfnSvR6B4SYuM2W

 Secret hash: 1c43aad028199ba9a06c88cc350ef068f50808c6

 */