import {Hash160} from "../common/hashing";
import * as bitcore from "bitcore";

const Base58Check = bitcore.encoding.Base58Check;
const Address = bitcore.Address;

export class Util {
  // redeemAtomicSwapSigScriptSize is the worst case (largest) serialize size
  // of a transaction input script to redeem the atomic swap contract.  This
  // does not include final push for the contract itself.
  //
  //   - OP_DATA_73
  //   - 72 bytes DER signature + 1 byte sighash
  //   - OP_DATA_33
  //   - 33 bytes serialized compressed pubkey
  //   - OP_DATA_32
  //   - 32 bytes secret
  //   - OP_TRUE
  public static redeemAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1 + 32 + 1;

  // refundAtomicSwapSigScriptSize is the worst case (largest) serialize size
  // of a transaction input script that refunds a P2SH atomic swap output.
  // This does not include final push for the contract itself.
  //
  //   - OP_DATA_73
  //   - 72 bytes DER signature + 1 byte sighash
  //   - OP_DATA_33
  //   - 33 bytes serialized compressed pubkey
  //   - OP_FALSE
  public static refundAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1;

  public static getUnixTimeFor2Days() {
    return Util.getCurrentUnixTime();
  }

  /**
   * Flatten map
   * @param arr
   */
  public static flatMap(arr) {
    return arr.reduce((a, b) => {
      return a.concat(b);
    }, []);
  }

  /**
   * New address public key hash
   * @param hash
   * @param net
   * @returns {any}
   * @constructor
   */
  public static NewAddressPubKeyHash(hash, net) {
    let netBuffer;
    if (net === "testnet") {
      netBuffer = Buffer.from([0x6F]);
    } else {
      netBuffer = Buffer.from([0x00]);
    }
    const pkhBuffer = Buffer.from(hash, "hex");
    const versionPayload = Buffer.concat([netBuffer, pkhBuffer], 21);
    const encoded = Base58Check.encode(versionPayload);
    return Address.fromString(encoded);
  }

  /**
   * Return encoded address
   * @param serializedScript
   * @param net
   * @returns {any}
   * @constructor
   */
  public static NewAddressScriptHash(serializedScript, net) {
    let netBuffer;
    if (net === "testnet") {
      netBuffer = Buffer.from([0xC4]);
    } else {
      netBuffer = Buffer.from([0x05]);
    }

    const hash160: Hash160 = new Hash160();
    const scriptBuffer = Buffer.from(serializedScript, "hex");
    const hashScriptBuffer = hash160.buffer(scriptBuffer);

    const versionPayload = Buffer.concat([netBuffer, hashScriptBuffer], 21);
    const encoded = Base58Check.encode(versionPayload);
    return Address.fromString(encoded);
  }

  /**
   * Serialize value
   * @param val
   * @returns {number}
   * @constructor
   * https://github.com/btcsuite/btcd/blob/915fa6639b092c3d92e351cde47769b5c85fbc1c/wire/common.go#L566
   */
  public static VarIntSerializeSize(val) {
    const MaxUint16 = 65535;
    const MaxUint32 = 4294967295;
    // The value is small enough to be represented by itself, so it's
    // just 1 byte.
    if (val < 253) {
      return 1;
    }

    // Discriminant 1 byte plus 2 bytes for the uint16.
    if (val <= MaxUint16) {
      return 3;
    }

    // Discriminant 1 byte plus 4 bytes for the uint32.
    if (val <= MaxUint32) {
      return 5;
    }

    // Discriminant 1 byte plus 8 bytes for the uint64.
    return 9;
  }

  public static InputSize(sigScriptSize) {
    return 32 + 4 + Util.VarIntSerializeSize(sigScriptSize) + sigScriptSize + 4;
  }

  public static SumOutputSerializeSizes(outputs) {
    let serializeSize = 0;
    for (const output of outputs) {
      serializeSize += output.toBufferWriter().toBuffer().length;
    }
    return serializeSize;
  }

  public static EstimateRedeemSerializeSize(contract, txOuts) {
    // const contractPush = new Script(contract);
    const contractPushSize = contract.toBuffer().length;
    // 12 additional bytes are for version, locktime and expiry.
    return 12 + Util.VarIntSerializeSize(1) + Util.VarIntSerializeSize(txOuts.length) +
      Util.InputSize(Util.redeemAtomicSwapSigScriptSize + contractPushSize) +
      Util.SumOutputSerializeSizes(txOuts);
  }

  /**
   * Estimate refund serialize size
   * @param contract
   * @param txOuts
   * @returns {any}
   * @constructor
   */
  public static EstimateRefundSerializeSize(contract, txOuts) {
    const contractPushSize = contract.toBuffer().length;
    return 12 + Util.VarIntSerializeSize(1) + Util.VarIntSerializeSize(txOuts.length) +
      Util.InputSize(Util.refundAtomicSwapSigScriptSize + contractPushSize) + Util.SumOutputSerializeSizes(txOuts);
  }

  public static FeeForSerializeSize(relayFeePerKb, txSerializeSize): number {
    const fee = relayFeePerKb * txSerializeSize / 1024;
    return fee;
    // return fee.toFixed(8);
  }

  /**
   * Get unix time
   * @param {number} appendDays
   * @returns {number}
   */
  private static getCurrentUnixTime(appendDays = 0) {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + appendDays);
    return parseInt((currDate.getTime() / 1000).toFixed(0), 10);
  }
}
