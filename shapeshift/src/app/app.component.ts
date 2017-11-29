import {Component, HostListener, OnInit, ViewEncapsulation} from "@angular/core";
import {Store} from "@ngrx/store";
import {BtcWalletTestNet, EthWalletTestnet, FreshBitcoinWallet, RegenerateBitcoinWallet} from "altcoinio-wallet";
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
  public altcoinLogo = "assets/icon/altcoin-icon.png";
  private headerHidden = false;
  private didScroll = false;

  constructor(private store: Store<AppState>) {
    let codes;
    if (environment.production) {
      codes = ''; // TODO Wallet.code;
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

  @HostListener("window:scroll", ["$event"])
  onScrollEvent($event) {
    this.didScroll = true;
  }

  public ngOnInit() {
    this.hideHeaderOnScroll();
  }

// TODO create fromMnemonic method in wallets
  private generateBtcWallet(codes: any) {
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    console.log(xprivKey);
    let wallet;
    const btc = new BtcWalletTestNet();
    if (!xprivKey) {
      wallet = new FreshBitcoinWallet(codes.phrase);
      btc.create(wallet);
      console.log(btc);
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
    const eth = new EthWalletTestnet();

    const recovered = eth.recover(xprivKey);
    eth.login(recovered, xprivKey);
    const ethWallet = {
      privateKey: xprivKey,
      keystore: recovered,
      address: recovered.address,
    };
    this.store.dispatch(new walletAction.SetEthWalletAction(ethWallet));
  }

  private hideHeaderOnScroll() {
    let lastScrollTop = 0;
    const delta = 5;
    const navbarHeight = 60;
    setInterval(() => {
      if (this.didScroll) {
        const st = document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) <= delta) {
          return;
        }
        this.headerHidden = st > lastScrollTop && st > navbarHeight;
        lastScrollTop = st;
        this.didScroll = false;
      }
    }, 250);
  }
}
