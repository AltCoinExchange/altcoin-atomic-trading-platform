import {Component, OnInit} from "@angular/core";
import {Go} from "../../actions/router.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";
import {BtcWalletTestNet, FreshBitcoinWallet} from "altcoinio-wallet";
import * as walletAction from "../../actions/wallet.action";
import {MessageTypes} from "../../models/message-types.enum";

@Component({
  selector: "app-import-wallet",
  templateUrl: "./import-wallet.component.html",
  styleUrls: ["./import-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class ImportWalletComponent implements OnInit {

  errorMsg: string;
  hasError: boolean = false;
  messageTypes: typeof MessageTypes = MessageTypes;
  scaleInOut = "scaleInOut";
  cardVisible: boolean = true;
  words;

  constructor(private store: Store<AppState>) {
    this.words = [{value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""}];
  }

  ngOnInit() {
  }

  importWallet() {
    this.hasError = false;
    const phrase = this.concatPhrase();
    const codes = {
      phrase: phrase
    };
    try {
      this.createBtcWallet(codes);
      this.cardVisible = false;
      setTimeout(() => {
        this.store.dispatch(new Go({
          path: ["/wallet"],
        }));
      }, 1500);
    } catch (err) {
      this.hasError = true;
      this.errorMsg = err.message;
    }
  }

  private createBtcWallet(codes: any) {
    const btc = new BtcWalletTestNet();
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

  private concatPhrase() {
    let phrase = "";
    for (let i = 0; i < this.words.length; i++) {
      phrase += this.words[i].value;
      if (i < this.words.length - 1)
        phrase += " ";
    }
    return phrase;
  }

}
