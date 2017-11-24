import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/app.state";
import {GetBtcBalanceAction, GetEthBalanceAction} from "../actions/balance.action";
import {Observable} from "rxjs/Observable";
import {getBalanceLoading, getBTCBalance, getETHBalance} from "../selectors/balance.selector";
import {WalletRecord} from "../reducers/balance.reducer";
import { MessageTypes } from '../models/message-types.enum';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;
  $loading: Observable<boolean>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;

  constructor(private store: Store<AppState>) {
    this.infoMsg = "This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.";

    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());

    this.$loading = this.store.select(getBalanceLoading);
    this.$ethBalance = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
  }

  ngOnInit() {
    
  }

  copyEthAddress(event){
    const copyText = <HTMLInputElement>document.getElementById("ethAddress");
    copyText.select();
    document.execCommand("Copy");
  }

  copyBtcAddress(event){
    const copyText = <HTMLInputElement>document.getElementById("btcAddress");
    copyText.select();
    document.execCommand("Copy");
  }

}