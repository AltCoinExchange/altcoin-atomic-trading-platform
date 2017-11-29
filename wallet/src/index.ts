import {BtcWallet} from './wallet-btc';
const Mnemonic = require('bitcore-mnemonic');
import {EthWallet} from './wallet-eth';
// import {DcrWallet} from "./dcr-wallet";

export class Wallet {

  static get Ethereum() {
    return {
      EthWallet
    };
  }

  // static get Decred() {
  //     return {
  //         DcrWallet
  //     };
  // }

  static get Bitcoin() {
    return {
      BtcWallet
    };
  }

  static get code() {
    return new Mnemonic();
  }
}