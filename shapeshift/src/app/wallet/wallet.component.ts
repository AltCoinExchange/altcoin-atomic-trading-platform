import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/app.state";
import {GetBtcBalanceAction, GetEthBalanceAction} from "../actions/balance.action";
import {Observable} from "rxjs/Observable";
import {getBalanceLoading, getBTCBalance, getETHBalance} from "../selectors/balance.selector";
import {WalletRecord} from "../reducers/balance.reducer";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  $loading: Observable<boolean>;
  $ethBalanace: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());

    this.$loading = this.store.select(getBalanceLoading);
    this.$ethBalanace = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
  }

  ngOnInit() {
  }

}
