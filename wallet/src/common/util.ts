import {Hash160} from './hashing';

const Base58Check = require('bitcore').encoding.Base58Check;
const Address = require('bitcore').Address;

export class Util {
    public static getUnixTimeFor2Days() {
        return Util.getCurrentUnixTime();
    }

    private static getCurrentUnixTime(appendDays = 0) {
        const currDate = new Date();
        currDate.setDate(currDate.getDate() + appendDays);
        return parseInt((currDate.getTime() / 1000).toFixed(0));
    }

    static NewAddressPubKeyHash(hash, net) {
        let netBuffer;
        if (net === 'testnet') {
            netBuffer = Buffer.from([0x6F]);
        } else {
            netBuffer = Buffer.from([0x00]);
        }
        const pkhBuffer = Buffer.from(hash, 'hex');
        const versionPayload = Buffer.concat([netBuffer, pkhBuffer], 21);
        const encoded = Base58Check.encode(versionPayload);
        return Address.fromString(encoded);
    }

    static NewAddressScriptHash(serializedScript, net) {
        let netBuffer;
        if (net === 'testnet') {
            netBuffer = Buffer.from([0xC4]);
        } else {
            netBuffer = Buffer.from([0x05]);
        }

        const hash160: Hash160 = new Hash160();
        const scriptBuffer = Buffer.from(serializedScript, 'hex');
        const hashScriptBuffer = hash160.buffer(scriptBuffer);

        const versionPayload = Buffer.concat([netBuffer, hashScriptBuffer], 21);
        const encoded = Base58Check.encode(versionPayload);
        return Address.fromString(encoded);
    }
}
