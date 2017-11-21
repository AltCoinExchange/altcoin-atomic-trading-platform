// import {WalletModel} from './wallet.model';
//
// export interface BtcWalletModel extends WalletModel{
//   addresses: {};
//   wif: string;
//   derived: {};
//   xprivkey: string;
// }
import * as wallet from 'wallet';
import {WalletModel} from './wallet.model';
import {Observable} from 'rxjs/Observable';
import * as util from '../../common/util';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';
import * as btcswap from 'btc-atomic-swap';

export class BtcWalletModel extends WalletModel {
  private readonly btcWallet;
  public wif: string;
  public xprivkey: string;
  public addresses: {};
  public derived: any;

  constructor(xprivKey, codesPhrase?: string[]) {
    super();
    let btc;
    if (!xprivKey) {
      btc = new wallet.Wallet.Bitcoin.BtcWallet(codesPhrase);
    } else {
      btc = new wallet.Wallet.Bitcoin.BtcWallet(xprivKey, true);
    }

    btc.generateHDPrivateKey();
    this.xprivKey = xprivKey;
    this.privKey = btc.hdPrivateKey.privateKey.toWIF();
    this.btcWallet = btc;
  }

  static fromPrivKey(privKey: string) {
    return new BtcWalletModel(privKey);
  }

  static fromMnemonic(mnemonic: string[]) {
    return new BtcWalletModel(null, mnemonic);
  }

  public newAddress(): string {
    const address = this.btcWallet.generateAddressFromWif(this.privKey);
    return address.toString();
  }

  privateKey(): string {
    return this.privKey;
  }

  generateNewAddress() {
    const btc = new wallet.Wallet.Bitcoin.BtcWallet(this.xprivkey, true);
    const address = btc.generateAddressFromWif(ShapeshiftStorage.get('btc-wif'));
    return address.toString();
  }

  getBalance(address: string) {
    const addr = this.btcWallet.generateAddressFromWif(this.privKey);
    return Observable.fromPromise(util.HttpRequester.Request({ url: '/api/v2/get_address_balance/BTCTEST/' + addr }));
  }

  extractSecret(data) {
    console.log('BTC extractSecret');
    console.log('data.secretHash', data.secretHash);
    console.log('data.redeemTx', data.redeemTx);
    const extract = btcswap.extractSecret(data.redeemTx, data.secretHash);
    return Observable.of(extract);
  }

  initiate(address: string, amount: number): any {
    const initiateResult = btcswap.initiate(address, amount, ShapeshiftStorage.get('btc-wif'));
    return Observable.fromPromise(initiateResult);
  }

  participate(address: string, secretHash: string, amount: number): any {
    const participateResult = btcswap.participate(address, amount.toString(),
      secretHash.replace('0x', ''),
      ShapeshiftStorage.get('btc-wif'));
    return Observable.fromPromise(participateResult);
  }

  redeem(data) {
    const wif = ShapeshiftStorage.get('btc-wif');
    console.log('BTC redeeming data.contractHex ', data.contractHex);
    console.log('BTC redeeming data.contractTxHex ', data.contractTxHex);
    console.log('BTC redeeming data.secret ', data.secret);
    console.log('BTC redeeming wif ', wif);
    const secret = data.secret.replace('0x', '');
    const redeemResult = btcswap.redeem(/**contract*/ data.contractHex, /**contractTx*/data.contractTxHex, /**secret*/secret, wif);
    return Observable.fromPromise(redeemResult);
  }

  refund(hashedSecret: string);
  refund(contract: string, contractTx: string): any;
  refund(address: string, contractTx?: string) {
  }
}
