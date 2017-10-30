const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;


export const atomicSwapContract = (refundAddress, pkhThem, lockTime, secretHash) => {
  const script = new Script();
  script.add(Opcode.OP_IF);
  script.add(Opcode.OP_RIPEMD160);
  script.add(Buffer.from(secretHash));
  script.add(Opcode.OP_EQUALVERIFY);
  script.add(Opcode.OP_DUP);
  script.add(Opcode.OP_HASH160);
  script.add(Buffer.from(pkhThem));

  script.add(Opcode.OP_ELSE);
  script.add(Buffer.from(String(lockTime)));
  script.add('OP_CHECKLOCKTIMEVERIFY');
  script.add(Opcode.OP_DROP);
  script.add(Opcode.OP_DUP);
  script.add(Opcode.OP_HASH160);
  script.add(Buffer.from(refundAddress));

  script.add(Opcode.OP_ENDIF);

  script.add(Opcode.OP_EQUALVERIFY);
  script.add(Opcode.OP_CHECKSIG);
  return script;
};
