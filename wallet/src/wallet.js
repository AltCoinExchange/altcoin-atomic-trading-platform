import {BtcWallet} from './btc-wallet';
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
}
