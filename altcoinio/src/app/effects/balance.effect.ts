import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {TOKENS} from "altcoinio-wallet";
import * as balanceAction from "../actions/balance.action";
import * as walletAction from "../actions/wallet.action";
import {AltcoinioStorage} from "../common/altcoinio-storage";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {AccountHelperService} from "../services/account-helper.service";
import {Go} from "../actions/router.action";

@Injectable()
export class BalanceEffect {

  @Effect()
  fundEthAddress: Observable<Action> = this.actions$
    .ofType(walletAction.FUND_ETH_WALLET)
    .map(toPayload)
    .flatMap(payload => {
      return this.accountService.fundAddress(payload).flatMap(result => {
        return Observable.of(new Go({
          path: ["/wallet"],
        }));
      });
    });
  private ethWallet: any;
  private btcWallet: any;
  private btcInstance: any;
  @Effect()
  getBtcBalance: Observable<Action> = this.actions$
    .ofType(balanceAction.GET_BTC_BALANCE)
    .flatMap(() => {
        this.init();
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
        this.init();
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
        this.init();
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
        this.init();
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

  constructor(private actions$: Actions, private accountService: AccountHelperService) {

  }

  private init() {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    if (xprivKey) {
      const {ethInstance, ethWallet, btcWallet, btcInstance} = this.accountService.generateWalletsFromPrivKey();
      this.ethInstance = ethInstance;
      this.ethWallet = ethWallet;
      this.btcInstance = btcInstance;
      this.btcWallet = btcWallet;
    }
  }
}
