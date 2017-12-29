import { Component, OnInit } from '@angular/core';
import { Go } from "../../actions/router.action";
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.state';
import { scaleInOutAnimation } from '../../animations/animations'; 
import {
  BtcWalletTestNet,
  FreshBitcoinWallet,
  generateMnemonic,
} from 'altcoinio-wallet';
import * as walletAction from '../../actions/wallet.action';
import { ShapeshiftStorage } from '../../common/shapeshift-storage';

@Component({
  selector: 'app-write-phrase',
  templateUrl: './write-phrase.component.html',
  styleUrls: ['./write-phrase.component.scss'],
  animations: [ scaleInOutAnimation ]
})
export class WritePhraseComponent implements OnInit {

  scaleInOut = 'scaleInOut';
  cardVisible : boolean = true;
  codes;
  words : Array<string>;
  wordCounter: number;

  constructor(private store: Store<AppState>) { 
    this.generatePhrase();
  }

  ngOnInit() {
  }

  generatePhrase(){
    this.codes = {
      phrase: generateMnemonic()
    };
    // this.codes = {
    //   phrase: 'away stomach fire police satoshi wire entire awake dilemma average town napkin'
    // };
    this.words = this.codes.phrase.split(' ');
    this.wordCounter = 0;
  }

  previousWord(){
    if(this.wordCounter > 0)
      this.wordCounter--;
  }

  nextWord(){
    if(this.wordCounter < 11)
      this.wordCounter++;
    else if(this.wordCounter == 11)
      this.createWallet();
  }

  createWallet(){
    this.cardVisible = false;
    this.createBtcWallet(this.codes);
    setTimeout(() => {
      this.store.dispatch(new Go({
        path: ["/wallet"],
      }));
    }, 500);
  }

  private createBtcWallet(codes: any) {
    const btc = new BtcWalletTestNet();
    let wallet = new FreshBitcoinWallet(codes.phrase);
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
