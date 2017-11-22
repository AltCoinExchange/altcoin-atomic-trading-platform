const RIPEMD160 = require('ripemd160');
const crypto = require('crypto-browserify');

export enum AlgoTypes {
    Ripemd160,
    Hash160,
}

export class SecretResult {
    secret;
    secretHash;

    constructor(secret: string, secretHash: string) {
        this.secret = secret;
        this.secretHash = secretHash;
    }
}

export interface IHashAlgo {
    hash(value: string);
    buffer(value: string);
}

export class Ripemd160 implements IHashAlgo {
    public hash(value: string) {
        return new RIPEMD160().update(value).digest('hex');
    }
    public buffer(value: string) {
        return new RIPEMD160().update(value).digest();
    }
}

export class Hash160 implements IHashAlgo {
    public hash(value: string) {
        const hashScriptBuffer = crypto.createHash('sha256').update(value).digest();
        return new RIPEMD160().update(hashScriptBuffer).digest('hex');
    }
    public buffer(value: string) {
        const hash = crypto.createHash('sha256').update(value).digest();
        return new RIPEMD160().update(hash).digest();
    }
}

/**
 * Secret generator class
 */
export class SecretGenerator {

    public static generateSecret(algo: AlgoTypes) {

        let algoInstance: IHashAlgo;
        if (algo === AlgoTypes.Ripemd160) {
            algoInstance = new Ripemd160();
        } else if (algo === AlgoTypes.Hash160) {
            algoInstance = new Hash160();
        }

        const secretBuffer = crypto.randomBytes(32);
        const secret = secretBuffer.toString('hex');
        const secretHash = algoInstance.hash(secretBuffer);
        return new SecretResult(secret, secretHash);
    };

}

/**
 * Hash256 then RIPEMD160 = hash160
 * @param value
 */

// export const hash160 = (value) => {
//     const hashScriptBuffer = crypto.createHash('sha256').update(value).digest();
//     return new RIPEMD160().update(hashScriptBuffer).digest('hex');
// };
//
//
// export const hash160Buffer = (value) => {
//     const hash = crypto.createHash('sha256').update(value).digest();
//     return new RIPEMD160().update(hash).digest();
// };

// export const ripemd160 = (value) => {
//     return new RIPEMD160().update(value).digest('hex');
// };

// export const ripemd160Buffer = (value) => {
//     return new RIPEMD160().update(value).digest();
// };
