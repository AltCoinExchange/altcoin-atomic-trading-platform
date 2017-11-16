'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;
var Opcode = require('bitcore').Opcode;
var Buffer = require('buffer/').Buffer;

var atomicSwapContract = exports.atomicSwapContract = function atomicSwapContract(refundAddress, pkhThem, lockTime, secretHash) {
  var conv = function conv(num) {
    var b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint32Array(b));
  };

  var decimalToHexString = function decimalToHexString(number) {
    if (number < 0) {
      number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
  };

  var script = new Script();
  script.add(Opcode.OP_IF);
  script.add(Opcode.OP_RIPEMD160);
  script.add(new Buffer(secretHash, 'hex'));
  script.add(Opcode.OP_EQUALVERIFY);
  script.add(Opcode.OP_DUP);
  script.add(Opcode.OP_HASH160);
  script.add(new Buffer(pkhThem, 'hex'));

  script.add(Opcode.OP_ELSE);
  script.add(new Buffer(decimalToHexString(conv(lockTime)[0]), 'hex'));
  script.add('OP_CHECKLOCKTIMEVERIFY');
  script.add(Opcode.OP_DROP);
  script.add(Opcode.OP_DUP);
  script.add(Opcode.OP_HASH160);
  script.add(new Buffer(refundAddress, 'hex'));

  script.add(Opcode.OP_ENDIF);

  script.add(Opcode.OP_EQUALVERIFY);
  script.add(Opcode.OP_CHECKSIG);
  return script;
};
