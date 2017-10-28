'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiate = initiate;

var _buildContract = require('./build-contract');

var _secretHash = require('./common/secret-hash');

var _unixTs = require('./common/unix-ts');

var _publicTx = require('./common/public-tx');

async function initiate(cp2Addr, amount) {
  var _generateSecret = (0, _secretHash.generateSecret)(),
      secret = _generateSecret.secret,
      secretHash = _generateSecret.secretHash;

  console.log('** secret    ', secret);
  console.log('** secretHash    ', secretHash);

  var lockTime = (0, _unixTs.getUnixTimeFor2Days)();
  console.log('build');
  var signedTx = await (0, _buildContract.buildContract)(cp2Addr, amount, lockTime, secretHash);
  var rawTx = await (0, _publicTx.publishTx)(signedTx);
  console.log('** rawTx   ', rawTx);

  return rawTx;
}