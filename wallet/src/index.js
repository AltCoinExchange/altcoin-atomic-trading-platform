import {BtcWallet} from './btc-wallet';
const Mnemonic = require('bitcore-mnemonic');
import {EthWallet} from "./eth-wallet";

export class Wallet {

  static get Ethereum() {
    return {
      EthWallet
    }
  }

  static get Bitcoin() {
    return {
      BtcWallet
    }
  }

  static get code() {
    const code = new Mnemonic();
    return code;
  }
}
