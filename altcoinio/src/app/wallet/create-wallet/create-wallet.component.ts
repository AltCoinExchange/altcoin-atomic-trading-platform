import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {scaleInOutAnimation} from "../../animations/animations";
import {BitcoinWallet, FreshBitcoinWallet, generateMnemonic,} from "altcoinio-wallet";
import {AccountHelper} from "../../common/account-helper";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import * as walletAction from "../../actions/wallet.action";
import {FundEthWalletAction} from "../../actions/wallet.action";
import {MessageTypes} from "../../models/message-types.enum";

@Component({
  selector: "app-create-wallet",
  templateUrl: "./create-wallet.component.html",
  styleUrls: ["./create-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class CreateWalletComponent implements OnInit {

  scaleInOut = "scaleInOut";
  cardVisible = true;
  fundingWallet = false;
  fundingMsg: string;
  messageTypes = MessageTypes;
  codes;

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  writePhrase() {
    this.cardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/write']);
    }, 1500);
  }

  downloadPhrase(){
    this.generatePhrase();
    this.saveTextAsFile(this.codes.phrase, 'AltcoinKeyPhrase');
    this.createWallet();
  }

  generatePhrase() {
    this.codes = {
      phrase: generateMnemonic()
    };
  }

  saveTextAsFile (data, filename){
    if(!data){
      console.log('No data');
      return;
    }

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }

  createWallet() {
    this.cardVisible = false;
    this.createBtcWallet(this.codes);
    this.fundingWallet = true;
    this.fundingMsg = 'We are sending you some testnet tokens';
    setTimeout(() => {
      // this.router.navigate(['/wallet']);
      const {ethWallet} = AccountHelper.generateWalletsFromPrivKey(this.store);
      this.store.dispatch(new FundEthWalletAction(ethWallet.address));
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
