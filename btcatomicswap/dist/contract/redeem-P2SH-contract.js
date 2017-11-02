'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Script = require('bitcore').Script;
var Opcode = require('bitcore').Opcode;
var Buffer = require('buffer/').Buffer;

var redeemP2SHContract = exports.redeemP2SHContract = function redeemP2SHContract(contract, sig, pubkey, secret) {
  var script = new Script();
  script.add(new Buffer(sig, 'hex'));
  script.add(new Buffer(pubkey, 'hex'));
  script.add(new Buffer(secret, 'hex'));
  script.add(Opcode.OP_1);
  // script.add(Opcode.OP_PUSHDATA#());
  script.add(new Buffer(contract, 'hex'));

  // script.add(Buffer.from(sig, "hex"));
  // script.add(Buffer.from(pubkey, "hex"));
  // script.add(Buffer.from(secret, "hex"));
  // script.add(Opcode.OP_1);
  // // script.add(Opcode.OP_PUSHDATA#());
  // script.add(Buffer.from(contract, "hex"));
  return script;
};