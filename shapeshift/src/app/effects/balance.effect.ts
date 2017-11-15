import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as balanceAction from '../actions/balance.action';
import {Http} from "@angular/http";
import {AppState} from "../reducers/app.state";
import * as walletSelector from '../selectors/wallets.selector';
import {EthCoinModel} from "../models/coins/eth-coin.model";


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

  constructor(private http: Http,
              private store: Store<AppState>,
              private actions$: Actions,) {
  }
}
