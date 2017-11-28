import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as balanceAction from "../actions/balance.action";
import {BtcCoinModel} from "../models/coins/btc-coin.model";
import {EthCoinModel} from "../models/coins/eth-coin.model";
import {AppState} from "../reducers/app.state";
import * as walletSelector from "../selectors/wallets.selector";
import {getWalletState} from "../selectors/wallets.selector";


@Injectable()
export class BalanceEffect {

  @Effect()
  getEthBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_ETH_BALANCE)
    .withLatestFrom(this.store.select(getWalletState))
    .flatMap(([, wallet]) => {
        const eth = new EthCoinModel();
        const address = wallet[eth.name].address;
        return Observable.fromPromise(eth.getbalance(address)).map(balance => {
          const result = {
            address, balance,
          };
          return new balanceAction.GetEthBalanceSuccessAction(result);
        });
      },
    );

  @Effect()
  getBtcBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_BTC_BALANCE)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .flatMap(([, wallet]) => {
        const coin = new BtcCoinModel();
        const address = wallet[coin.name].address;
        return Observable.fromPromise(coin.getbalance(address)).map(balance => {
          return new balanceAction.GetBtcBalanceSuccessAction({address, balance});
        });
      },
    );

  constructor(private store: Store<AppState>,
              private actions$: Actions) {
  }
}
