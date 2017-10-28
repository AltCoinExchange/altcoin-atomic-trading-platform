const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;

export const extractAtomicSwapContract = (ct) => {
  const contract = new Script(ct);
  const pops = contract.toString().split(' ');
  const opCodes = pops.filter(opcode => opcode.indexOf('0x') === -1);

  const isAtomicSwap =
    (new Opcode(opCodes[0]).toString() === new Opcode(Opcode.OP_IF).toString()) &&
    (new Opcode(opCodes[1]).toString() === new Opcode(Opcode.OP_RIPEMD160).toString()) &&
    (parseInt(opCodes[2]) === 20) &&
    (new Opcode(opCodes[3]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
    (new Opcode(opCodes[4]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
    (new Opcode(opCodes[5]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
    (parseInt(opCodes[6]) === 20) &&
    (new Opcode(opCodes[7]).toString() === new Opcode(Opcode.OP_ELSE).toString()) &&
    (parseInt(opCodes[8]) === 5) &&
    (new Opcode(opCodes[9]).toString() === new Opcode(Opcode.OP_CHECKLOCKTIMEVERIFY).toString()) &&
    (new Opcode(opCodes[10]).toString() === new Opcode(Opcode.OP_DROP).toString()) &&
    (new Opcode(opCodes[11]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
    (new Opcode(opCodes[12]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
    (parseInt(opCodes[13]) === 20) &&
    (new Opcode(opCodes[14]).toString() === new Opcode(Opcode.OP_ENDIF).toString()) &&
    (new Opcode(opCodes[15]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
    (new Opcode(opCodes[16]).toString() === new Opcode(Opcode.OP_CHECKSIG).toString());

  console.log('isAtomicSwap', isAtomicSwap);


  const data = pops.filter(opcode => opcode.indexOf('0x') !== -1);


  const secretHash = data[0];
  const recipientHash = data[1];
  const lockTime = data[2].replace('0x', '');
  const refundHash160 = data[3];

  console.log('secretHash', secretHash);
  console.log('recipientHash', recipientHash);
  console.log('lockTime', lockTime);
  console.log('lockTime Date', new Date(lockTime * 1000));
  console.log('refundHash160', refundHash160);

  return {
    secretHash,
    recipientHash,
    lockTime,
    refundHash160,
  }

};
