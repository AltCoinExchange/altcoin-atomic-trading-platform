const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;

export class ScriptUtil {
  static payToPubKeyHashScript(pubKeyHash) {
    const script = new Script();
    script.add(Opcode.OP_DUP);
    script.add(Opcode.OP_HASH160);
    script.add(new Buffer(pubKeyHash, 'hex'));
    script.add(Opcode.OP_EQUALVERIFY);
    script.add(Opcode.OP_CHECKSIG);
    return script;
  }
}
