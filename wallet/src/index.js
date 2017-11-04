import {BtcWallet} from './btc-wallet';
const Mnemonic = require('bitcore-mnemonic');
import {EthWallet} from "./eth-wallet";

export class Wallet {

  static get Ethereum() {
    return {
      EthWallet,
      'login': (keystore, password) => {
        this.EthWallet = new EthWallet();
        this.EthWallet.login(keystore, password);
      },
      'create': (password) => {
          this.EthWallet = new EthWallet();
          this.EthWallet.create(password);
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
