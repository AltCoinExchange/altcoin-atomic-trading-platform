'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;

var extractAtomicSwapContract = exports.extractAtomicSwapContract = function extractAtomicSwapContract(ct) {
  var contract = new Script(ct);
  var pops = contract.toString().split(' ');
  console.log(pops);
  var opCodes = pops.filter(function (opcode) {
    return opcode.indexOf('0x') === -1;
  });
  var secretHash = pops[3];
  var recepientHash = pops[8];
  var refundHash160 = pops[17];

  console.log('secretHash', secretHash);
  console.log('recepientHash', recepientHash);
  console.log('refundHash160', refundHash160);
};