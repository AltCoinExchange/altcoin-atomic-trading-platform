'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildContract = undefined;

var _rawRequest = require('../common/rawRequest');

var _atomicSwapContract = require('./atomic-swap-contract');

var _feePerKb = require('../common/fee-per-kb');

var _signTransaction = require('../common/sign-transaction');

var _secretHash = require('../common/secret-hash');

var Buffer = require('buffer/').Buffer;
var Transaction = require('bitcore').Transaction;

var buildContract = exports.buildContract = async function buildContract(them, amount, lockTime, secretHash) {

  var refundAddr = await getChangeAddress();
  var refundAddrH = refundAddr.toString();
  console.log('refundAddrH', refundAddrH);
  console.log('hash160(refundAddrH)', (0, _secretHash.hash160)(refundAddrH));
  console.log('them', them);
  console.log('hash160(them)', (0, _secretHash.hash160)(them));

  try {
    var contract = (0, _atomicSwapContract.atomicSwapContract)((0, _secretHash.hash160)(refundAddrH), (0, _secretHash.hash160)(them), lockTime, secretHash);
    console.log('** contract    ', contract.toHex());

    var contractP2SH = contract.toScriptHashOut();

    var feePerKb = await (0, _feePerKb.getFeePerKb)();
    console.log('** feePerKb    ', feePerKb);

    var transaction = new Transaction().fee(+amount);
    var output = Transaction.Output({
      script: contractP2SH,
      satoshis: amount * 100000000
    });
    transaction.addOutput(output);

    try {
      var fundRawTx = await (0, _rawRequest.fundRawTransaction)(transaction.toString(), feePerKb);
      var signedTx = await (0, _signTransaction.signTransaction)(fundRawTx.data.result.hex);
      console.log('** signedTx    ', signedTx.hex);
      return signedTx.hex;
    } catch (fundErr) {
      if (fundErr && fundErr.response) {
        console.log('fundErr', fundErr.response.data, 'fundErr');
      } else {
        console.log('fundErr', fundErr, 'fundErr');
      }
    }
  } catch (err) {
    console.log('err: ', err);
  }
};

var getChangeAddress = async function getChangeAddress() {
  var refundAddr = await (0, _rawRequest.getRawChangeAddress)();
  var addressHex = new Buffer(refundAddr).toString('hex');
  return addressHex;
};