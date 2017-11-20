import {WalletModel} from './wallet.model';

export interface BtcWalletModel extends WalletModel{
  addresses: {};
  wif: string;
  derived: {};
  xprivkey: string;
}
//
// import * as wallet from 'wallet';
// import {WalletModel} from './wallet.model';
// import {Observable} from 'rxjs/Observable';
// import * as http from 'https';
//
// export class BtcWalletModel extends WalletModel {
//
//   private readonly btcWallet;
//
//   constructor(xprivKey, codesPhrase?: string[]) {
//     super();
//     let btc;
//     if (!xprivKey) {
//       btc = new wallet.Wallet.Bitcoin.BtcWallet(codesPhrase);
//     } else {
//       btc = new wallet.Wallet.Bitcoin.BtcWallet(xprivKey, true);
//     }
//
//     btc.generateHDPrivateKey();
//     this.xprivKey = xprivKey;
//     this.privKey = btc.hdPrivateKey.privateKey.toWIF();
//     this.btcWallet = btc;
//   }
//
//   static fromPrivKey(privKey: string) {
//     return new BtcWalletModel(privKey);
//   }
//
//   static fromMnemonic(mnemonic: string[]) {
//     return new BtcWalletModel(null, mnemonic);
//   }
//
//   get newAddress() {
//     const address = this.btcWallet.generateAddressFromWif(this.privKey);
//     return address.toString();
//   }
//
//   balance() {
//
//   }
//
//   get privateKey(): string {
//     return this.privKey;
//   }
// }
