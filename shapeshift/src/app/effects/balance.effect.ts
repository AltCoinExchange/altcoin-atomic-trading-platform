import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {TOKENS} from "altcoinio-wallet";
import * as balanceAction from "../actions/balance.action";
import {BtcCoinModel} from "../models/coins/btc-coin.model";
import {EthCoinModel} from "../models/coins/eth-coin.model";
import {EthWallet} from "../models/wallets/eth-wallet";
import {AppState} from "../reducers/app.state";
import * as walletSelector from "../selectors/wallets.selector";
import {getWalletState} from "../selectors/wallets.selector";
import {BtcWallet} from "../models/wallets/btc-wallet";
import {WalletFactory} from "../models/wallets/wallet";
import {Coins} from "../models/coins/coins.enum";


@Injectable()
export class BalanceEffect {

  @Effect()
  getEthBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_ETH_BALANCE)
    .withLatestFrom(this.store.select(getWalletState))
    .flatMap(([, wallet]) => {
        const eth = new EthCoinModel();
        const address = wallet[eth.name].address;
        const ethwallet = new EthWallet();
        return Observable.fromPromise(ethwallet.getbalance(address)).map(balance => {
          const result = {
            address, balance,
          };
          return new balanceAction.GetEthBalanceSuccessAction(result);
        });
      },
    );

  @Effect()
  getBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_REP_BALANCE)
    .withLatestFrom(this.store.select(getWalletState))
    .flatMap(([, wallet]) => {
        const eth = new EthCoinModel();
        const address = wallet[eth.name].address;
        const ethwallet = new EthWallet();
        const token = ethwallet.getERC20Token(TOKENS.AUGUR);
        return Observable.fromPromise(token.balanceOf(address)).map(balance => {
          //return Observable.fromPromise(repToken.balanceOf(address)).map(balance => {
          const result = {
            address, balance,
          };
          return new balanceAction.GetRepBalanceSuccessAction(result);
        });
      },
    );

  @Effect()
  getTokenBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_TOKEN_BALANCE)
    .map(toPayload)
    .withLatestFrom(this.store.select(getWalletState))
    .flatMap(([payload, wallet]) => {
        const address = wallet[this.eth.name].address;
        const token = this.ethwallet.getERC20Token(payload.token);
        return Observable.fromPromise(token.balanceOf(address)).map(balance => {
          const result = {
            address, balance, name: payload.name
          };
          return new balanceAction.GetTokenBalanceSuccessAction(result);
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
        const btcwallet = new BtcWallet();
        return Observable.fromPromise(btcwallet.getbalance(address)).map(balance => {
          return new balanceAction.GetBtcBalanceSuccessAction({address, balance});
        });
      },
    );

  eth;
  ethwallet;

  constructor(private store: Store<AppState>,
              private actions$: Actions) {
    // this.eth = new EthCoinModel();
    // this.ethwallet = WalletFactory.createWallet(Coins.ETH);
  }
}
