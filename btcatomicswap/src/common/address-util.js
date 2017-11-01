import {hash160Buffer} from './secret-hash';
const buffer = require('buffer');
const Base58Check = require('bitcore').encoding.Base58Check;
const Address = require('bitcore').Address;

export class AddressUtil {
  static NewAddressPubKeyHash(hash, net) {
    let netBuffer;
    if (net === 'testnet') {
      netBuffer = buffer.Buffer.from([0x6F]);
    } else {
      netBuffer = buffer.Buffer.from([0x00]);
    }
    const pkhBuffer = buffer.Buffer.from(hash, "hex");
    const versionPayload = buffer.Buffer.concat([netBuffer, pkhBuffer], 21);
    const encoded = Base58Check.encode(versionPayload);
    return Address.fromString(encoded);
  }

  static NewAddressScriptHash(serializedScript, net) {
    let netBuffer;
    if (net === 'testnet') {
      netBuffer = buffer.Buffer.from([0xC4]);
    } else {
      netBuffer = buffer.Buffer.from([0x05]);
    }

    const scriptBuffer = buffer.Buffer.from(serializedScript, "hex");
    const hashScriptBuffer = hash160Buffer(scriptBuffer);

    const versionPayload = buffer.Buffer.concat([netBuffer, hashScriptBuffer], 21);
    const encoded = Base58Check.encode(versionPayload);
    return Address.fromString(encoded);
  }
}
