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
//     const requestOptions = {
//       host: 'chain.so',
//       port: 80,
//       method: 'POST',
//       path: '/api/v2/get_address_balance/BTCTEST/' + this.newAddress,
//       rejectUnauthorized: false,
//       agent: false,
//       // ca: 'cert'
//     };
//
//     const result = new Promise(function(reject, resolve) {
//       const req = http.request(requestOptions);
//       req.on('response', function (response) {
//
//         // We need to buffer the response chunks in a nonblocking way.
//         let buffer = '';
//
//         response.on('data', function (chunk) {
//           buffer = buffer + chunk;
//         });
//         // When all the responses are finished, we decode the JSON and
//         // depending on whether it's got a result or an error, we call
//         // emitSuccess or emitError on the promise.
//         response.on('end', function () {
//           try {
//             resolve(JSON.parse(buffer));
//           } catch (e) {
//             reject(e);
//           }
//         });
//
//       });
//     });
//
//     return Observable.fromPromise(result);
//   }
//
//   get privateKey(): string {
//     return this.privKey;
//   }
// }
