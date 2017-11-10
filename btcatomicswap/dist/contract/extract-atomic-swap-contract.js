'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;
var Opcode = require('bitcore').Opcode;

var extractAtomicSwapContract = exports.extractAtomicSwapContract = function extractAtomicSwapContract(ct) {
  var contract = new Script(ct);
  var pops = contract.toString().split(' ');
  var opCodes = pops.filter(function (opcode) {
    return opcode.indexOf('0x') === -1;
  });

  var isAtomicSwap = new Opcode(opCodes[0]).toString() === new Opcode(Opcode.OP_IF).toString() && new Opcode(opCodes[1]).toString() === new Opcode(Opcode.OP_RIPEMD160).toString() && parseInt(opCodes[2]) === 20 && new Opcode(opCodes[3]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString() && new Opcode(opCodes[4]).toString() === new Opcode(Opcode.OP_DUP).toString() && new Opcode(opCodes[5]).toString() === new Opcode(Opcode.OP_HASH160).toString() && parseInt(opCodes[6]) === 20 && new Opcode(opCodes[7]).toString() === new Opcode(Opcode.OP_ELSE).toString() && parseInt(opCodes[8]) && new Opcode(opCodes[9]).toString() === new Opcode(Opcode.OP_CHECKLOCKTIMEVERIFY).toString() && new Opcode(opCodes[10]).toString() === new Opcode(Opcode.OP_DROP).toString() && new Opcode(opCodes[11]).toString() === new Opcode(Opcode.OP_DUP).toString() && new Opcode(opCodes[12]).toString() === new Opcode(Opcode.OP_HASH160).toString() && parseInt(opCodes[13]) === 20 && new Opcode(opCodes[14]).toString() === new Opcode(Opcode.OP_ENDIF).toString() && new Opcode(opCodes[15]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString() && new Opcode(opCodes[16]).toString() === new Opcode(Opcode.OP_CHECKSIG).toString();

  if (!isAtomicSwap) {
    console.error('contract is not an atomic swap script!');
    return;
  }

  var data = pops.filter(function (opcode) {
    return opcode.indexOf('0x') !== -1;
  });

  var secretHash = data[0];
  var recipientHash = data[1];
  var lockTime = data[2].replace('0x', '');
  var refundHash160 = data[3];

  return {
    secretHash: secretHash,
    recipientHash: recipientHash,
    lockTime: lockTime,
    refundHash160: refundHash160
  };
};
