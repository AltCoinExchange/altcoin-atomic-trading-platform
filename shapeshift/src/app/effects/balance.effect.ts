import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {TOKENS} from "altcoinio-wallet";
import * as balanceAction from "../actions/balance.action";
import {AppState} from "../reducers/app.state";
import {ShapeshiftStorage} from "../common/shapeshift-storage";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {AccountHelperService} from "../services/account-helper.service";

@Injectable()
export class BalanceEffect {

  private ethWallet: any;
  private btcWallet: any;
  private btcInstance: any;
  @Effect()
  getBtcBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_BTC_BALANCE)
    .flatMap(() => {
        if (!this.btcWallet) {
          this.init();
        }
        const address = this.btcWallet.address;
        return Observable.fromPromise(this.btcInstance.getbalance(address)).map(balance => {
          return new balanceAction.GetBtcBalanceSuccessAction({address, balance});
        });
      },
    );
  private ethInstance: any;
  @Effect()
  getEthBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_ETH_BALANCE)
    .flatMap(() => {
        if (!this.ethWallet) {
          this.init();
        }
        const address = this.ethWallet.address;
        return Observable.fromPromise(this.ethInstance.getbalance(address)).map(balance => {
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
    .flatMap(() => {
        if (!this.ethWallet) {
          this.init();
        }
        const address = this.ethWallet.address;
        const token = this.ethInstance.getERC20Token(TOKENS.AUGUR);
        return Observable.fromPromise(token.balanceOf(address)).map(balance => {
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
    .flatMap((payload) => {
        if (!this.ethWallet) {
          this.init();
        }
        const address = this.ethWallet.address;
        const token = this.ethInstance.getERC20Token(payload.token);
        return Observable.fromPromise(token.balanceOf(address)).map(balance => {
          const result = {
            address, balance, name: payload.name
          };
          return new balanceAction.GetTokenBalanceSuccessAction(result);
        });
      },
    );

  constructor(private store: Store<AppState>,
              private actions$: Actions, private accountService: AccountHelperService) {
    console.log("BalanceEffect");
  }

  private init() {
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    if (xprivKey) {
      const {ethInstance, ethWallet, btcWallet, btcInstance} = this.accountService.generateWalletsFromPrivKey();
      this.ethInstance = ethInstance;
      this.ethWallet = ethWallet;
      this.btcInstance = btcInstance;
      this.btcWallet = btcWallet;
    }
    console.log("BalanceEffect initialized");
  }
}
