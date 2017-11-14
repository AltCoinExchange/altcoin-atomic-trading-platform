'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiate = initiate;

var _buildContract = require('./contract/build-contract');

var _secretHash = require('./common/secret-hash');

var _unixTs = require('./common/unix-ts');

var _publicTx = require('./common/public-tx');

async function initiate(them, amount, privateKey) {
  var _generateSecret = (0, _secretHash.generateSecret)(),
      secret = _generateSecret.secret,
      secretHash = _generateSecret.secretHash;

  var lockTime = (0, _unixTs.getUnixTimeFor2Days)();
  var b = await (0, _buildContract.buildContract)(them, amount, lockTime, secretHash, privateKey);

  var rawTx = await (0, _publicTx.publishTx)(b.contractTx.toString());

  // console.log('Secret:              ', secret);
  // console.log('Secret hash:         ', secretHash);
  // console.log('Contract fee:        ', b.contractFee);
  // console.log('Refund fee:          ', b.refundFee);
  // console.log('\n');
  // console.log(
  //   'Contract:            ',
  //   '(' + b.contractP2SH.toString() + ')',
  // );
  // console.log(b.contract.toHex());
  // console.log('\n');
  // console.log('Contract transaction:', '(' + b.contractTxHash + ')');
  // console.log(b.contractTx.toString());
  // console.log('\n');
  // console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
  // console.log(b.refundTx.toString());
  // console.log('Published contract transaction: ', rawTx);
  return {
    secret: secret,
    secretHash: secretHash,
    fee: b.contractFee,
    contract: b.contractP2SH.toString(),
    contractHex: b.contract.toHex(),
    contractTx: b.contractTx,
    contractTxHex: b.contractTx.hex,
    rawTx: rawTx
  };
}