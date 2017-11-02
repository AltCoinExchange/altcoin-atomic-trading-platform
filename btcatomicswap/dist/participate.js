'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.participate = undefined;

var _unixTs = require('./common/unix-ts');

var _buildContract = require('./contract/build-contract');

var participate = exports.participate = async function participate(them, amount, secretHash) {
  var lockTime = (0, _unixTs.getUnixTimeFor2Days)();
  var b = await (0, _buildContract.buildContract)(them, amount, lockTime, secretHash);
};