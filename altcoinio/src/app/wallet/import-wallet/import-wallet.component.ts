import {Component, HostListener, OnInit} from "@angular/core";
import {Go} from "../../actions/router.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";
import {BitcoinWallet, FreshBitcoinWallet} from "altcoinio-wallet";
import * as walletAction from "../../actions/wallet.action";
import {MessageTypes} from "../../models/message-types.enum";
import {AccountHelper} from "../../common/account-helper";
import {RC4} from "../../common/rc4";

class Node {
  public elem;
  public next;

  constructor(elem) {
    this.elem = elem;
    this.next = null;
  }
}

@Component({
  selector: "app-import-wallet",
  templateUrl: "./import-wallet.component.html",
  styleUrls: ["./import-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class ImportWalletComponent implements OnInit {

  errorMsg: string;
  hasError = false;
  messageTypes: typeof MessageTypes = MessageTypes;
  scaleInOut = "scaleInOut";
  cardVisible = true;
  phrase;
  enteredValue = "";

  constructor(private store: Store<AppState>) {
    this.phrase = '';
  }

  ngOnInit() {
  }

  importWallet() {
    this.hasError = false;
    const codes = {
      phrase: this.phrase
    };
    try {
      this.createBtcWallet(codes);
      this.cardVisible = false;
      setTimeout(() => {
        this.store.dispatch(new Go({
          path: ["/wallet"],
        }));
        AccountHelper.generateWalletsFromPrivKey(this.store);
      }, 1500);
    } catch (err) {
      this.hasError = true;
      this.errorMsg = err.message;
    }
  }

  onPhraseInsert(ev) {
    this.phrase = ev;
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
