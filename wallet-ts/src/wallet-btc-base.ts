import {BtcRpcConfiguration} from './config/config';
import {BtcConfiguration} from './config/config-btc';
import {BtcAtomicSwap} from './btc/btc-atomic-swap';
import * as Hashing from './common/hashing';
import {Util} from './btc/util';

const Mnemonic = require('bitcore-mnemonic');
const bitcore = require('bitcore');
const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BWallet {
  hdPrivateKey: any;
  derived: {};
  addressess: {};
  code: any;
  configuration: any;

  constructor(configuration, code, regenerate = false) {
    this.configuration = configuration;
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

  /**
   * Generate HD private key
   * @param passPhrase
   * @returns {any}
   */
  generateHDPrivateKey(passPhrase) {
    this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, BtcRpcConfiguration.network);
    return this.hdPrivateKey;
  }

  /**
   * Derive HD private
   * @param deriveArg
   * @returns {any}
   */
  deriveHdPrivateKey(deriveArg) {
    if (!this.hdPrivateKey) {
      throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
    }
    const derived = this.hdPrivateKey.derive(deriveArg);
    this.derived[deriveArg] = derived;
    return derived;
  }

  /**
   * Generate new address
   * @param hdPublicKey
   * @returns {any}
   */
  generateAddress(hdPublicKey) {
    if (!hdPublicKey) {
      throw new Error('hdPublicKey required to generate address');
    }
    const address = hdPublicKey.publicKey.toAddress();
    this.addressess[hdPublicKey] = address;
    return address;
  }

  /**
   * Generate address from WIF
   * @param wif
   * @returns {any}
   */
  generateAddressFromWif(wif) {
    const WIF = new PrivateKey(wif);
    return WIF.toPublicKey().toAddress(BtcConfiguration.network);
  }

  /**
   * Get derived key
   * @returns {{}}
   */
  getDerived() {
    return this.derived;
  }

  /**
   * Initiate atomic swap
   * @param them
   * @param amount
   * @param privateKey
   * @returns {Promise<{secret; secretHash; fee: number; contract: string; contractHex; contractTx; contractTxHex: string; rawTx: Promise<any>}>}
   */
  async initiate(them, amount, privateKey) {
    // const result: Hashing.SecretResult = Hashing.SecretGenerator.generateSecret(Hashing.AlgoTypes.Ripemd160);
    // const lockTime = Util.getUnixTimeFor2Days();
    //
    // const contract = new BtcAtomicSwap(this.configuration);
    //
    // return {
    //   secret: result.secret,
    //   secretHash: result.secretHash,
    //   fee: b.contractFee,
    //   contract: b.contractP2SH.toString(),
    //   contractHex: b.contract.toHex(),
    //   contractTx: b.contractTx.hash,
    //   contractTxHex: b.contractTx.toString(),
    //   rawTx,
    // };
  }
}
