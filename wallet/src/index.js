import {BtcWallet} from './btc-wallet';
const Mnemonic = require('bitcore-mnemonic');

export class Wallet {

  static get Ethereum() {
    return {
      'login': () => {
      },
      'create': () => {
      },
    }
  }

  static get Bitcoin() {
    return {
      BtcWallet,
    }
  }

  static get code() {
    const code = new Mnemonic();
    return code;
  }
}
