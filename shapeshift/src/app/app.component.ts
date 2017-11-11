import {Component, OnInit, ViewEncapsulation,} from '@angular/core';
import * as wallet from 'wallet';
import {Store} from '@ngrx/store';
import {AppState} from './reducers/app.state';
import * as walletAction from './actions/wallet.action';
import * as quoteAction from './actions/quote.action';
import {BtcWalletModel} from './models/wallets/btc-wallet.model';
import {EthWalletModel} from "./models/wallets/eth-wallet.model";


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
    this.generateEthWallet(codes);

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

      this.store.dispatch(new walletAction.SetBtcWalletAction(btcWallet));
    }
  }

  private generateEthWallet(codes: any) {
    const ethprivkey = localStorage.getItem('ethprivkey');
    if (!ethprivkey) {
      const btc = new wallet.Wallet.Bitcoin.BtcWallet(codes.phrase);
      btc.generateHDPrivateKey();
      const eth = new wallet.Wallet.Ethereum.EthWallet;
      const privateKey = btc.hdPrivateKey.xprivkey.toString();
      const ethWallet = {
        privateKey: privateKey,
        keystore: eth.create(privateKey)
      } as EthWalletModel;

      this.store.dispatch(new walletAction.SetEthWalletAction(ethWallet));

    }
  }


}
