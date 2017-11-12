import {Component, OnInit, ViewEncapsulation,} from '@angular/core';
import * as wallet from 'wallet';
import {Store} from '@ngrx/store';
import {AppState} from './reducers/app.state';
import * as walletAction from './actions/wallet.action';
import * as quoteAction from './actions/quote.action';
import {BtcWalletModel} from './models/wallets/btc-wallet.model';
import {EthWalletModel} from "./models/wallets/eth-wallet.model";
import {environment} from "../environments/environment";
import {ShapeshiftStorage} from "./common/shapeshift-storage";
import {EthCoinModel} from "./models/coins/eth-coin.model";


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
    let codes;
    if (environment.production) {
      codes = wallet.Wallet.code;
    } else {
      codes = {
        phrase: "away stomach fire police satoshi wire entire awake dilemma average town napkin"
      };
    }

    this.generateBtcWallet(codes);
    this.generateEthWallet(codes);

    this.store.dispatch(new quoteAction.LoadQuoteAction());

    const ethTest = new EthCoinModel();
    ethTest.amount = 1;
    ethTest.participate("0x094ecCA39F315a90B3dCf3dcAEb96d538906A5A6", "0x604873302736b12943ff7dcd53658f0f29ff6dfd").subscribe(r => {
      console.log(r);
    });
  }

  public ngOnInit() {

  }

  private generateBtcWallet(codes: any) {
    const xprivKey = ShapeshiftStorage.get('xprivkey');
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
    const ethprivkey = ShapeshiftStorage.get('ethprivkey');
    if (!ethprivkey) {
      const btc = new wallet.Wallet.Bitcoin.BtcWallet(codes.phrase);
      btc.generateHDPrivateKey();
      const eth = new wallet.Wallet.Ethereum.EthWallet;
      const privateKey = btc.hdPrivateKey.xprivkey.toString();
      console.log(privateKey);
      const ethWallet = {
        privateKey: privateKey,
        keystore: eth.recover(privateKey, "")
      } as EthWalletModel;

      this.store.dispatch(new walletAction.SetEthWalletAction(ethWallet));

    }
  }


}
