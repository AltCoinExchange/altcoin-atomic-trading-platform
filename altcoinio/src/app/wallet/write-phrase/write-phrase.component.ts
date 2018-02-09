import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";
import {BitcoinWallet, FreshBitcoinWallet, generateMnemonic,} from "altcoinio-wallet";
import * as walletAction from "../../actions/wallet.action";
import {AccountHelper} from "../../common/account-helper";

@Component({
  selector: "app-write-phrase",
  templateUrl: "./write-phrase.component.html",
  styleUrls: ["./write-phrase.component.scss"],
  animations: [scaleInOutAnimation]
})
export class WritePhraseComponent implements OnInit {

  scaleInOut = "scaleInOut";
  cardVisible = true;
  codes;
  words: Array<string>;
  wordCounter: number;

  constructor(private store: Store<AppState>, private router: Router) {
    this.generatePhrase();
  }

  ngOnInit() {
  }

  generatePhrase() {
    this.codes = {
      phrase: generateMnemonic()
    };
    // this.codes = {
    //   phrase: 'away stomach fire police satoshi wire entire awake dilemma average town napkin'
    // };
    this.words = this.codes.phrase.split(" ");
    this.wordCounter = 0;
  }

  previousWord() {
    if (this.wordCounter > 0) {
      this.wordCounter--;
    }
  }

  nextWord() {
    if (this.wordCounter < 11) {
      this.wordCounter++;
    } else if (this.wordCounter === 11) {
      this.createWallet();
    }
  }

  createWallet() {
    this.cardVisible = false;
    this.createBtcWallet(this.codes);
    setTimeout(() => {
      this.router.navigate(['/wallet']);
      AccountHelper.generateWalletsFromPrivKey(this.store);
    }, 500);
  }

  private createBtcWallet(codes: any) {
    const btc = new BitcoinWallet();
    const wallet = new FreshBitcoinWallet(codes.phrase);
    btc.create(wallet);
    const WIF = btc.WIF;
    const address = btc.generateAddressFromWif(WIF);
    const xkey = btc.hdPrivateKey.xprivkey;
    this.store.dispatch(new walletAction.SetBtcWalletAction({
      xprivkey: xkey,
      WIF,
      address
    }));
  }

}
