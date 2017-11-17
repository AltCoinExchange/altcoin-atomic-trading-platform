'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditContract = undefined;

var _extractAtomicSwapContract = require('./contract/extract-atomic-swap-contract');

var _addressUtil = require('./common/address-util');

var _config = require('./config/config');

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
    var address = script.toAddress(_config.configuration.network);
    var addressHash = address.toJSON().hash;
    return addressHash === contractAddressString;
  });

  if (!hasTxOut) {
    console.error('transaction does not contain the secret');
    return;
  }

  var pushes = (0, _extractAtomicSwapContract.extractAtomicSwapContract)(ct);

  var recipientAddrString = pushes.recipientHash.replace('0x', '');
  var recipientAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(recipientAddrString, _config.configuration.network);

  var refundAddressString = pushes.refundHash160.replace('0x', '');
  var refundAddress = _addressUtil.AddressUtil.NewAddressPubKeyHash(refundAddressString, _config.configuration.network);

  var contractSH = _addressUtil.AddressUtil.NewAddressScriptHash(ct, _config.configuration.network).toString();
  var contractValue = hasTxOut.satoshis / 100000000 + ' BTC';

  console.log('Contract address:       ', contractSH);
  console.log('Contract value:         ', contractValue);
  console.log('Recipient address:      ', recipientAddress.toString());
  console.log('Authors refund address: ', refundAddress.toString());
  console.log('\n');
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('\n');
  console.log('Locktime:               ', new Date(pushes.lockTime * 1000));

  return {
    contractSH: contractSH,
    contractValue: contractValue,
    recipientAddress: recipientAddress.toString(),
    refundAddress: refundAddress.toString(),
    secretHash: pushes.secretHash.replace('0x', ''),
    lockTime: new Date(pushes.lockTime * 1000) // TODO reverse the staff from buildCOntract ^^
  };
};
