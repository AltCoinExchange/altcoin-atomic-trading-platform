import {Component, OnInit, ViewEncapsulation,} from '@angular/core';
import * as wallet from 'wallet';
import {Store} from '@ngrx/store';
import {AppState} from './reducers/app.state';
import * as btcWalletAction from './actions/wallet.action';
import * as quoteAction from './actions/quote.action';
import {BtcWalletModel} from './models/wallets/btc-wallet.model';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public altcoinLogo = 'assets/icon/altcoin-icon.png';
  public name = 'Angular 2 Webpack Starter';

  constructor(private store: Store<AppState>) {
    const codes = wallet.Wallet.code;

    this.generateBtcWallet(codes);

    this.store.dispatch(new quoteAction.LoadQuoteAction());
  }

  public ngOnInit() {

  }

  private generateBtcWallet(codes: any) {
    const xprivKey = localStorage.getItem('xprivkey');
    if (!xprivKey) {
      const btc = new wallet.Wallet.Bitcoin.BtcWallet(codes.phrase);
      btc.generateHDPrivateKey();

      const btcWallet = {
        xprivkey: btc.hdPrivateKey.xprivkey,
      } as BtcWalletModel;

      this.store.dispatch(new btcWalletAction.SetBtcWalletAction(btcWallet));
    }
  }
}
