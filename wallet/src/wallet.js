import {BtcWallet} from './btc-wallet';

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
}
