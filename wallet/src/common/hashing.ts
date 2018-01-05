import * as RIPEMD160 from "ripemd160";
import * as crypto from "crypto-browserify";

export enum AlgoTypes {
  Ripemd160,
  Hash160,
}

export class SecretResult {
  public secretHash;
  public secret;

  constructor(secret: string, secretHash: string) {
    this.secret = secret;
    this.secretHash = secretHash;
  }
}

export interface IHashAlgo {
  hash(value: string);

  buffer(value: any);
}

export class Ripemd160 implements IHashAlgo {
  public hash(value: string) {
    return new RIPEMD160().update(value).digest("hex");
  }

  public buffer(value: any) {
    return new RIPEMD160().update(value).digest();
  }
}

export class Hash160 implements IHashAlgo {
  public hash(value: string) {
    const hashScriptBuffer = crypto.createHash("sha256").update(value).digest();
    return new RIPEMD160().update(hashScriptBuffer).digest("hex");
  }

  public buffer(value: any) {
    const hash = crypto.createHash("sha256").update(value).digest();
    return new RIPEMD160().update(hash).digest();
  }
}

/**
 * Secret generator class
 */
export class SecretGenerator {

  /**
   * Generate secret
   * @param {AlgoTypes} algo
   * @returns {SecretResult}
   */
  public static generateSecret(algo: AlgoTypes = AlgoTypes.Ripemd160) {

    let algoInstance: IHashAlgo;
    if (algo === AlgoTypes.Ripemd160) {
      algoInstance = new Ripemd160();
    } else if (algo === AlgoTypes.Hash160) {
      algoInstance = new Hash160();
    }

    const secretBuffer = crypto.randomBytes(32);
    const secret = secretBuffer.toString("hex");
    const secretHash = algoInstance.hash(secretBuffer);
    return new SecretResult(secret, secretHash);
  }
}
