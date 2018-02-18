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
  words;

  easterEggCombination = [
    {correct: false, value: 38},
    {correct: false, value: 38},
    {correct: false, value: 40},
    {correct: false, value: 40},
    {correct: false, value: 37},
    {correct: false, value: 39},
    {correct: false, value: 37},
    {correct: false, value: 39},
    {correct: false, value: 66},
    {correct: false, value: 65},
  ];

  easterEgg = new LinkedList(this.easterEggCombination);
  easterUnlocked = false;
  easterEggValue = "";

  constructor(private store: Store<AppState>) {
    this.words = [{value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""},
      {value: ""}, {value: ""}, {value: ""}];
  }

  @HostListener("document:keydown", ["$event"])
  public onKeyDown(e) {
    const code = e.keyCode;
    this.openEgg(code);
  }

  openEgg(code) {
    if (this.easterUnlocked) {
      return;
    }
    if (this.easterEgg.head.elem.value === code) {
      this.easterEgg.pop();
      if (this.easterEgg.len === 0) {
        this.easterUnlocked = true;
      }
    } else {
      this.easterEgg = new LinkedList(this.easterEggCombination);
    }
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
        AccountHelper.generateWalletsFromPrivKey(this.store);
      }, 1500);
    } catch (err) {
      this.hasError = true;
      this.errorMsg = err.message;
    }
  }

  onEasterEggInsert(ev) {
    ev.split(" ").forEach((word, index) => {
      this.words[index].value = word;
    });
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

  private concatPhrase() {
    return this.words.map(word => word.value).join(" ");
  }
}

class LinkedList {
  public head = null;
  public len = 0;

  constructor(values: any[]) {
    values.forEach(val => {
      this.append(val);
    });
  }

  public append(elem) {
    const node = new Node(elem);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.len++;
  }

  pop() {
    this.head = this.head.next;
    this.len--;
  }
}
