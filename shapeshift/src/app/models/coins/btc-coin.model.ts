import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {BtcWalletModel} from '../wallets/btc-wallet.model';
import * as btcswap from 'btc-atomic-swap';
import {Observable} from "rxjs/Observable";

export class BtcCoinModel implements Coin {
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = 'assets/icon/btc-icon.png';
  readonly iconOutline: string = 'assets/icon/btc-icon-o.png';
  amount: number;

  generateNewAddress(btcWallet: BtcWalletModel) {
    const btc = new wallet.Wallet.Bitcoin.BtcWallet(btcWallet.xprivkey, true);

    const derivedPrivKey = btc.deriveHdPrivateKey(1); //TODO this also needs to be autoincremental
    const hdPublicKey = derivedPrivKey.hdPublicKey;
    const address = btc.generateAddress(hdPublicKey);
    return address.toString();
  }

  update(coin: Coin): Coin {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }

  extractSecret(hashedSecret: string) {
    throw new Error('Method not implemented.');
  }

  initiate(address: string): any {
    const initiateResult = btcswap.initiate(address, this.amount);
    return Observable.fromPromise(initiateResult);
  }

  participate(address: string, secretHash: string): any {
    return undefined;
  }

  redeem(secret: string, secretHash: string);
  redeem(secret: string, contract: string, contractTx: string): any;
  redeem(secret: string, secretHash: string, contractTx?: string) {
  }

  refund(hashedSecret: string);
  refund(contract: string, contractTx: string): any;
  refund(address: string, contractTx?: string) {
  }
}
