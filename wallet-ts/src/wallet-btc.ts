import {BtcRpcConfiguration} from './config/config';
import {BtcConfiguration} from './config/config-btc';

const Mnemonic = require('bitcore-mnemonic');
const bitcore = require('bitcore');
const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BtcWallet {

  hdPrivateKey: any;
  derived: {};
  addressess: {};
  code: any;

  constructor(code, regenerate = false) {
    if (regenerate === true) {
      this.hdPrivateKey = new HDPrivateKey(code);
    } else {
      const valid = Mnemonic.isValid(code);
      if (!valid) {
        throw Error('Not valid mnemonic code');
      }
      this.code = new Mnemonic(code);
    }
    this.derived = {};
    this.addressess = {};
  }

  generateHDPrivateKey(passPhrase) {
    this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, BtcRpcConfiguration.network);
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

  generateAddressFromWif(wif) {
    const WIF = new PrivateKey(wif);
    return WIF.toPublicKey().toAddress(BtcConfiguration.network);
  }

  getDerived() {
    return this.derived;
  }
}
