'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;

var estimateRefundSerializeSize = exports.estimateRefundSerializeSize = function estimateRefundSerializeSize(contract, txOuts) {
  var contractPush = new Script(contract);
  var contractPushSize = contractPush.toBuffer().length;
};