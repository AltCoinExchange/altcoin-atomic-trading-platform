const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;


export const atomicSwapContract = (refundAddress, pkhThem, lockTime, secretHash) => {
  const conv = num => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint32Array(b));
  };

  const decimalToHexString = (number) => {
    if (number < 0) {
      number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
  };

  const script = new Script();
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
