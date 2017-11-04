import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coin} from '../models/coin.model';
import {BtcWalletModel} from '../models/btc-wallet.model';
import * as wallet from 'wallet';

@Injectable()
export class LinkService {
  // TODO this is obviously wrong, wallet needs to be more generic
  // TODO generate address for different wallets

  public generateLink(depositCoin: Coin, btcWallet: BtcWalletModel): Observable<string> {
    //TODO if btc
    const btc = new wallet.Wallet.Bitcoin.BtcWallet(btcWallet.xprivkey, true);

    console.log(btc);

    const derivedPrivKey = btc.deriveHdPrivateKey(1); //TODO this also needs to be autoincremental
    const hdPublicKey = derivedPrivKey.hdPublicKey;
    const address = btc.generateAddress(hdPublicKey);

    const data = [
      new Date(),
      depositCoin.amount,
      address.toString(),
    ];

    const stringified = JSON.stringify(data);
    const link = btoa(stringified);

    return Observable.of(link);
  }
}
