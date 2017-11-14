'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.participate = undefined;

var _unixTs = require('./common/unix-ts');

var _buildContract = require('./contract/build-contract');

var _publicTx = require('./common/public-tx');

var participate = exports.participate = async function participate(them, amount, secretHash, privkey) {
  var lockTime = (0, _unixTs.getUnixTimeFor2Days)();
  var b = await (0, _buildContract.buildContract)(them, amount, lockTime, secretHash, privkey);

  var rawTx = await (0, _publicTx.publishTx)(b.contractTx.hex);

  console.log('Secret hash:         ', secretHash);
  console.log('Contract fee:        ', b.contractFee);
  console.log('Refund fee:          ', '-- TODO --');
  console.log('\n');
  console.log('Contract:            ', '(' + b.contractP2SH.toString() + ')');
  console.log(b.contract.toHex());
  console.log('\n');
  console.log('Contract transaction:', '(' + b.contractTxHash + ')');
  console.log(b.contractTx.hex);
  console.log('\n');
  console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
  console.log(b.refundTx.toString());
  console.log('Published contract transaction: ', rawTx);
  return {
    fee: b.contractFee,
    contract: b.contractP2SH.toString(),
    contractHex: b.contract.toHex(),
    contractTx: b.contractTx,
    contractTxHex: b.contractTx.hex,
    rawTx: rawTx
  };
};