import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {GetBtcBalanceAction, GetEthBalanceAction} from "../actions/balance.action";
import {MessageTypes} from "../models/message-types.enum";
import {AppState} from "../reducers/app.state";
import {WalletRecord} from "../reducers/balance.reducer";
import {getBTCBalance, getBtcLoading, getETHBalance, getEthLoading} from "../selectors/balance.selector";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit {
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  $ethLoading: Observable<boolean>;
  $btcLoading: Observable<boolean>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;

  constructor(private store: Store<AppState>) {
    this.infoMsg = "This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.";

    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());

    this.$ethLoading = this.store.select(getEthLoading);
    this.$btcLoading = this.store.select(getBtcLoading);

    this.$ethBalance = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
  }

  ngOnInit() {

  }

  copyEthAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById("ethAddress");
    copyText.select();
    document.execCommand("Copy");
  }

  copyBtcAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById("btcAddress");
    copyText.select();
    document.execCommand("Copy");
  }

}
