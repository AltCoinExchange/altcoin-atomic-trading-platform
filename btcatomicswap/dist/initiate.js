'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiate = initiate;

var _buildContract = require('./contract/build-contract');

var _secretHash = require('./common/secret-hash');

var _unixTs = require('./common/unix-ts');

var _publicTx = require('./common/public-tx');

async function initiate(cp2Addr, amount) {
  var _generateSecret = (0, _secretHash.generateSecret)(),
      secret = _generateSecret.secret,
      secretHash = _generateSecret.secretHash;

  var lockTime = (0, _unixTs.getUnixTimeFor2Days)();
  var b = await (0, _buildContract.buildContract)(cp2Addr, amount, lockTime, secretHash);

  var rawTx = await (0, _publicTx.publishTx)(b.contractTx.hex);

  console.log('Secret:              ', secret);
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
  console.log('Refund transaction:  ', '(', '-- TODO --', ')');
  console.log('Published contract transaction: ', rawTx);
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