import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";
import {BitcoinWallet, FreshBitcoinWallet, generateMnemonic,} from "altcoinio-wallet";
import * as walletAction from "../../actions/wallet.action";
import {AccountHelper} from "../../common/account-helper";
import {MessageTypes} from "../../models/message-types.enum";

@Component({
  selector: "app-write-phrase",
  templateUrl: "./write-phrase.component.html",
  styleUrls: ["./write-phrase.component.scss"],
  animations: [scaleInOutAnimation]
})
export class WritePhraseComponent implements OnInit {

  messageTypes: typeof MessageTypes = MessageTypes;
  scaleInOut = "scaleInOut";
  cardVisible = true;
  confirmCardVisible = false;
  codes;
  words: Array<string>;
  checkWords;
  wordCounter: number;
  errorMsg: string;
  hasError = false;

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
      //this.createWallet();
      this.showConfirm();
    }
  }

  showConfirm(){
    this.checkWords = [{value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""}];
    for(let i = 0; i < 12; i ++){
      if(i!== 2 && i!== 5 && i!==10)
        this.checkWords[i].value = this.words[i];
    }
    this.cardVisible = false;
    setTimeout(() => {
      this.confirmCardVisible = true;
    }, 1500);
  }

  goBack(){
    this.confirmCardVisible = false;
    this.hasError = false;
    this.words = this.codes.phrase.split(" ");
    setTimeout(() => {
      this.cardVisible = true;
    }, 1500);
  }

  createWallet() {
    this.hasError = false;
    const phrase = this.concatPhrase();
    const codes = {
      phrase: phrase
    };
    try {
      this.createBtcWallet(codes);
      this.confirmCardVisible = false;
      setTimeout(() => {
        this.router.navigate(['/wallet']);
        AccountHelper.generateWalletsFromPrivKey(this.store);
      }, 1500);
    } catch (err) {
      this.hasError = true;
      this.errorMsg = err.message;
    }
  }

  private concatPhrase() {
    return this.checkWords.map(word => word.value).join(" ");
  }
  // TODO: refactor int to seperate function
  private createBtcWallet(codes: any) {
    const btc = new BitcoinWallet();
    const wallet = new FreshBitcoinWallet(codes.phrase);
    btc.create(wallet);
    const WIF = btc.WIF;
    const address = btc.generateAddressFromWif(WIF);
    const xkey = btc.hdPrivateKey.toBase58();
    this.store.dispatch(new walletAction.SetBtcWalletAction({
      xprivkey: xkey,
      WIF,
      address
    }));
  }

}
