import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {BtcWalletModel} from '../wallets/btc-wallet.model';

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
}
