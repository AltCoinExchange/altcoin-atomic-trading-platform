import {btcRpcConfiguration} from './config/config';

const Mnemonic = require('bitcore-mnemonic');

export class BtcWallet {

  constructor(code) {
    const valid = Mnemonic.isValid(code);
    if (!valid) {
      throw Error('Not valid mnemonic code');
    }
    this.code = new Mnemonic(code);
    this.derived = {};
    this.addressess = {};
  }

  generateHDPrivateKey(passPhrase = null) {
    if (passPhrase === null) {
      this.hdPrivateKey = this.code.toHDPrivateKey(btcRpcConfiguration.network);
    } else {
      this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, btcRpcConfiguration.network);
    }
    return this.hdPrivateKey;
  }

  deriveHdPrivateKey(deriveArg) {
    if (!this.hdPrivateKey) {
      throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
    }
    const derived = this.hdPrivateKey.derive(deriveArg);
    this.derived[deriveArg] = derived;
    return derived;
  }

  generateAddress(hdPublicKey) {
    if (!hdPublicKey) {
      throw new Error('hdPublicKey required to generate address');
    }
    const address = hdPublicKey.publicKey.toAddress();
    this.addressess[hdPublicKey] = address;
    return address;
  }

  getDerived() {
    return this.derived;
  }
}
