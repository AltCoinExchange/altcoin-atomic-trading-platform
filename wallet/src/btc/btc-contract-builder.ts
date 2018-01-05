import * as bitcore from "bitcore";
import {BtcAtomicSwapData} from "./atomic-swap";

const Script = bitcore.Script;
const Opcode = bitcore.Opcode;
const Transaction = bitcore.Transaction;
const PrivateKey = bitcore.PrivateKey;

export class BtcContractBuilder {

  /**
   * Get atomic swap contract
   * @param ct
   * @returns {any}
   */
  public static extractAtomicSwapContract(ct: any): BtcAtomicSwapData {
    const contract = new Script(ct);
    const pops = contract.toString().split(" ");
    const opCodes = pops.filter((opcode) => opcode.indexOf("0x") === -1);

    const isAtomicSwap =
      (new Opcode(opCodes[0]).toString() === new Opcode(Opcode.OP_IF).toString()) &&
      (new Opcode(opCodes[1]).toString() === new Opcode(Opcode.OP_RIPEMD160).toString()) &&
      (parseInt(opCodes[2]) === 20) &&
      (new Opcode(opCodes[3]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
      (new Opcode(opCodes[4]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
      (new Opcode(opCodes[5]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
      (parseInt(opCodes[6]) === 20) &&
      (new Opcode(opCodes[7]).toString() === new Opcode(Opcode.OP_ELSE).toString()) &&
      (parseInt(opCodes[8])) &&
      (new Opcode(opCodes[9]).toString() === new Opcode(Opcode.OP_CHECKLOCKTIMEVERIFY).toString()) &&
      (new Opcode(opCodes[10]).toString() === new Opcode(Opcode.OP_DROP).toString()) &&
      (new Opcode(opCodes[11]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
      (new Opcode(opCodes[12]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
      (parseInt(opCodes[13]) === 20) &&
      (new Opcode(opCodes[14]).toString() === new Opcode(Opcode.OP_ENDIF).toString()) &&
      (new Opcode(opCodes[15]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
      (new Opcode(opCodes[16]).toString() === new Opcode(Opcode.OP_CHECKSIG).toString());

    if (!isAtomicSwap) {
      throw new Error("contract is not an atomic swap script!");
    }

    const data = pops.filter((opcode) => opcode.indexOf("0x") !== -1);

    const secretHash = data[0];
    const recipientHash = data[1];
    const lockTime = data[2].replace("0x", "");
    const refundHash160 = data[3];

    return new BtcAtomicSwapData(secretHash, recipientHash, lockTime, refundHash160);
  }

  /**
   * Build atomic swap
   * @param refundAddress
   * @param pkhThem
   * @param lockTime
   * @param secretHash
   * @returns {any}
   */
  public static atomicSwapContract(refundAddress, pkhThem, lockTime, secretHash) {
    const conv = (num) => {
      const b = new ArrayBuffer(4);
      new DataView(b).setUint32(0, num);
      return Array.from(new Uint32Array(b));
    };

    const decimalToHexString = (n) => {
      if (n < 0) {
        n = 0xFFFFFFFF + n + 1;
      }

      return n.toString(16).toUpperCase();
    };

    const script = new Script();
    script.add(Opcode.OP_IF);
    script.add(Opcode.OP_RIPEMD160);
    script.add(new Buffer(secretHash, "hex"));
    script.add(Opcode.OP_EQUALVERIFY);
    script.add(Opcode.OP_DUP);
    script.add(Opcode.OP_HASH160);
    script.add(new Buffer(pkhThem, "hex"));

    script.add(Opcode.OP_ELSE);
    script.add(new Buffer(decimalToHexString(conv(lockTime)[0]), "hex"));
    script.add("OP_CHECKLOCKTIMEVERIFY");
    script.add(Opcode.OP_DROP);
    script.add(Opcode.OP_DUP);
    script.add(Opcode.OP_HASH160);
    script.add(new Buffer(refundAddress, "hex"));

    script.add(Opcode.OP_ENDIF);

    script.add(Opcode.OP_EQUALVERIFY);
    script.add(Opcode.OP_CHECKSIG);
    return script;
  }

  /**
   * Create redeem contract
   * @param contract
   * @param sig
   * @param pubkey
   * @param secret
   * @returns {any}
   */
  public static redeemP2SHContract(contract, sig, pubkey, secret) {
    const script = new Script();
    script.add(sig);
    script.add(new Buffer(pubkey, "hex"));
    script.add(new Buffer(secret, "hex"));
    script.add(Opcode.OP_1);
    script.add(new Buffer(contract, "hex"));

    // script.add(new Buffer(secret, 'hex'));
    // script.add(Buffer.from(secret, "hex"));

    return script;
  }

  /**
   * Refund Script Contract
   * @param contract
   * @param sig
   * @param pubkey
   * @param secret
   * @returns {any}
   */
  public static refundP2SHContract(contract, sig, pubkey, secret) {
    const script = new Script();
    // script.add(sig);
    script.add(new Buffer(sig));
    script.add(new Buffer(pubkey, "hex"));
    script.add(Opcode.OP_0);
    script.add(new Buffer(contract, "hex"));

    // script.add(new Buffer(secret, 'hex'));
    // script.add(Buffer.from(secret, "hex"));

    return script;
  }

  /**
   * Create signature
   * @param reedemTx
   * @param inputIndex
   * @param contract
   * @param recipientAddress
   * @param privateKey
   * @returns {{sig: any; pubKey: any}}
   */
  public static createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
    const wif = privateKey;
    const WIF = new PrivateKey(wif);
    const sighashType = 1;
    const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
    const pubKey = WIF.toPublicKey();
    return {sig, pubKey};
  }

  private configuration: any;

  constructor(btcConfiguration, btcRpcConfiguration) {
    this.configuration = btcRpcConfiguration;
  }
}
