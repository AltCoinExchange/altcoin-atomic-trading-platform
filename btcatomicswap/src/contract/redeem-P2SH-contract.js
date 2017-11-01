const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;

export const redeemP2SHContract = (contract, sig, pubkey, secret) => {
  const script = new Script();
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
