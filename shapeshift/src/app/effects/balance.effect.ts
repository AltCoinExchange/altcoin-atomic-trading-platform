import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as balanceAction from '../actions/balance.action';
import {Http} from "@angular/http";
import {AppState} from "../reducers/app.state";
import * as walletSelector from '../selectors/wallets.selector';
import {EthCoinModel} from "../models/coins/eth-coin.model";
import {BtcCoinModel} from "../models/coins/btc-coin.model";


@Injectable()
export class BalanceEffect {

  @Effect()
  getEthBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_ETH_BALANCE)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([, wallet]) => {
        const coin = new EthCoinModel();
        const address = coin.generateNewAddress(wallet[coin.name]);
        const b = coin.getBalance(address);
        return b.map(balance => {
          const result = {
            address, balance
          };
          return new balanceAction.GetEthBalanceSuccessAction(result);
        });

      },
    );

  @Effect()
  getBtcBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_BTC_BALANCE)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([, wallet]) => {
        const coin = new BtcCoinModel();
        const address = coin.generateNewAddress(wallet[coin.name]);
        return this.http.get('https://chain.so/api/v2/get_address_balance/BTCTEST/' + address).map(resp => {
          return new balanceAction.GetBtcBalanceSuccessAction({address, balance: resp.json().data.confirmed_balance,});
        });
      },
    );

  constructor(private http: Http,
              private store: Store<AppState>,
              private actions$: Actions,) {
  }
}
