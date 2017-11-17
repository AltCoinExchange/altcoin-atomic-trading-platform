import {BtcWallet} from './btc-wallet';
const Mnemonic = require('bitcore-mnemonic');
import {EthWallet} from "./eth-wallet";
import {DcrWallet} from "./dcr-wallet";

export class Wallet {

  static get Ethereum() {
    return {
      EthWallet
    };
  }

  static get Decred() {
      return {
          DcrWallet
      };
  }

  static get Bitcoin() {
    return {
      BtcWallet
    };
  }

  static get code() {
    const code = new Mnemonic();
    return code;
  }
}
