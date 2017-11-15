import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {BtcWalletModel} from '../wallets/btc-wallet.model';
import * as btcswap from 'btc-atomic-swap';
import {Observable} from "rxjs/Observable";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

export class BtcCoinModel implements Coin {
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = 'assets/icon/btc-icon.png';
  readonly iconOutline: string = 'assets/icon/btc-icon-o.png';
  readonly fullName: string = 'Bitcoin';
  amount: number;

  generateNewAddress(btcWallet: BtcWalletModel) {
    const btc = new wallet.Wallet.Bitcoin.BtcWallet(btcWallet.xprivkey, true);
    const address = btc.generateAddressFromWif(ShapeshiftStorage.get('btc-wif'));
    return address.toString();
  }

  update(coin: Coin): Coin {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }

  getBalance(address: string) {
    throw new Error("Method not implemented.");
  }

  extractSecret(data) {
    console.log('BTC extractSecret');
    console.log('data.secretHash', data.secretHash);
    console.log('data.redeemTx', data.redeemTx);
    const extract = btcswap.extractSecret(data.redeemTx, data.secretHash);
    return Observable.of(extract);
  }

  initiate(address: string): any {
    const initiateResult = btcswap.initiate(address, this.amount, ShapeshiftStorage.get('btc-wif'));
    return Observable.fromPromise(initiateResult);
  }

  participate(address: string, secretHash: string): any {
    const participateResult = btcswap.participate(address, this.amount.toString(), secretHash.replace('0x', ''), ShapeshiftStorage.get('btc-wif'));
    return Observable.fromPromise(participateResult);
  }

  redeem(data) {
    const wif = ShapeshiftStorage.get('btc-wif');
    console.log('BTC redeeming data.contractHex ', data.contractHex);
    console.log('BTC redeeming data.contractTxHex ', data.contractTxHex);
    console.log('BTC redeeming data.secret ', data.secret);
    console.log('BTC redeeming wif ', wif);
    const redeemResult = btcswap.redeem(/**contract*/ data.contractHex, /**contractTx*/data.contractTxHex, /**secret*/data.secret, wif);
    return Observable.fromPromise(redeemResult);
  }

  refund(hashedSecret: string);
  refund(contract: string, contractTx: string): any;
  refund(address: string, contractTx?: string) {
  }
}
