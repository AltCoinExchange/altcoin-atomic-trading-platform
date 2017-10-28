const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;


// TODO come back to this
export const atomicSwapContract = (refundAddress, pkhThem, lockTime, secretHash) => {
  const script = new Script();
  script.add(Opcode.OP_IF);
  script.add(Opcode.OP_RIPEMD160);
  script.add(new Buffer(secretHash, 'hex')); // TODO check if this is correct
  script.add(Opcode.OP_EQUALVERIFY);
  script.add(Opcode.OP_DUP);
  script.add(Opcode.OP_HASH160);
  script.add(new Buffer(pkhThem, 'hex'));

  script.add(Opcode.OP_ELSE);
  script.add(new Buffer(String(lockTime), 'hex'));
  // script.add(Opcode.OP_CHECKLOCKTIMEVERIFY);
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
