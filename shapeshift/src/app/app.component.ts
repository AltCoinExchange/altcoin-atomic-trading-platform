import {Component, OnInit, ViewEncapsulation, HostListener} from "@angular/core";
import {Store} from "@ngrx/store";
import {BtcWalletTestNet, EthWalletTestnet, FreshBitcoinWallet, RegenerateBitcoinWallet} from "ts-wallet";
import {Wallet} from "../../../wallet/src";
import {environment} from "../environments/environment";
import * as quoteAction from "./actions/quote.action";
import * as walletAction from "./actions/wallet.action";
import {ShapeshiftStorage} from "./common/shapeshift-storage";
import {AppState} from "./reducers/app.state";

@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "./app.component.scss",
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.didScroll = true;
  } 
  public altcoinLogo = "assets/icon/altcoin-icon.png";
  private headerHidden = false;
  private didScroll = false;
  
  constructor(private store: Store<AppState>) {
    let codes;
    if (environment.production) {
      codes = Wallet.code;
    } else {
      codes = {
        phrase: "away stomach fire police satoshi wire entire awake dilemma average town napkin",
      };
    }

    console.log(codes);
    const btcWallet = this.generateBtcWallet(codes);

    this.generateEthWallet(btcWallet.xprivkey);

    this.store.dispatch(new quoteAction.LoadQuoteAction());
  }

  public ngOnInit() {
    this.hideHeaderOnScroll();
  }

// TODO create fromMnemonic method in wallets
  private generateBtcWallet(codes: any) {
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    let wallet;
    const btc = new BtcWalletTestNet();
    if (!xprivKey) {
      wallet = new FreshBitcoinWallet(codes.phrase);
      btc.create(wallet);
    } else {
      wallet = new RegenerateBitcoinWallet(xprivKey);
      btc.recover(wallet);
    }
    const WIF = btc.WIF;
    const address = btc.generateAddressFromWif(WIF);
    const xkey = btc.hdPrivateKey.xprivkey;
    this.store.dispatch(new walletAction.SetBtcWalletAction({
      xprivkey: xkey,
      WIF,
      address,
    }));
    return {
      xprivkey: xkey,
      WIF,
    };
  }

  private generateEthWallet(xprivKey) {
    console.log('xprivKey', xprivKey);
    const eth = new EthWalletTestnet();

    const recovered = eth.recover(xprivKey);
    console.log(recovered);
    // eth.login(recovered, "abc");
    const ethWallet = {
      privateKey: xprivKey,
      keystore: recovered,
      address: recovered.address,
    };
    this.store.dispatch(new walletAction.SetEthWalletAction(ethWallet));
  }

  private hideHeaderOnScroll(){
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 60;
    setInterval(() => {
        if (this.didScroll) {
          var st = document.documentElement.scrollTop;
          if(Math.abs(lastScrollTop - st) <= delta)
            return;
          if (st > lastScrollTop && st > navbarHeight){
            this.headerHidden = true;
          } else {
              this.headerHidden = false;
          }
          lastScrollTop = st;
          this.didScroll = false;
        }
    }, 250);
  }
}
