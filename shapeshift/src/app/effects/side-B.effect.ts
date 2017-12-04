import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Go} from "../actions/router.action";
import * as sideB from "../actions/side-B.action";
import {AppState} from "../reducers/app.state";
import {getBLink, getBReceiveCoin} from "../selectors/side-b.selector";
import {getWalletState} from "../selectors/wallets.selector";
import {MoscaService} from "../services/mosca.service";
import {WalletFactory} from "../models/wallets/wallet";
import {Coin} from "../models/coins/coin.model";

@Injectable()
export class SideBEffect {

  @Effect()
  $initiate: Observable<Action> = this.actions$
    .ofType(sideB.INITIATE)
    .map(toPayload)
    .switchMap((payload) => {
        const coin = payload.coin as Coin;
        const wallet = WalletFactory.createWallet(coin.type);
        return wallet.Initiate(payload.address, coin).map(resp => {
          return new sideB.InitiateSuccessAction(resp);
        }).catch(err => Observable.of(new sideB.InitiateFailAction(err)));
      },
    );

  @Effect()
  $initiateSuccess: Observable<Action> = this.actions$
    .ofType(sideB.INITIATE_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) => {
      return Observable.from([
        new Go({
          path: ["/b/complete"],
        }),
        new sideB.InformInitiateAction(payload),
      ]);
    });

  @Effect()
  $informInitiate: Observable<Action> = this.actions$
    .ofType(sideB.INFORM_INITIATE)
    .map(toPayload)
    .withLatestFrom(
      this.store.select(getBLink),
      this.store.select(getBReceiveCoin),
      this.store.select(getWalletState),
      (payload, blink, bReceiveCoin, walletState) => {
        return {
          payload,
          link: blink,
          receiveCoin: bReceiveCoin,
          wallet: walletState,
        };
      })
    .mergeMap((data) => {
        // TODO payload contains SECRET ------- TODO please correct this
        console.log("TODO payload contains SECRET ------- TODO please correct this");
        const address = data.wallet[data.receiveCoin.name].address;
        data.payload = {
          ...data.payload,
          address,
        };
        return this.moscaService.informInitiate(data.link, data.payload).map(() => {
          return new sideB.InformInitiateSuccessAction(data.payload);
        }).catch(err => Observable.of(new sideB.InformInitiateFailAction(err)));
      },
    );

  @Effect()
  $informInitiateSuccess: Observable<Action> = this.actions$
    .ofType(sideB.INFORM_INITIATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideB.WaitForParticipateAction(resp);
      });
    });

  @Effect()
  $waitForParticipate: Observable<Action> = this.actions$
    .ofType(sideB.WAIT_FOR_PARTICIPATE)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideB.WaitForParticipateSuccessAction(resp);
        }).catch(err => Observable.of(new sideB.WaitForParticipateFailAction(err)));
      },
    );

  @Effect()
  $waitForParticipateSuccess: Observable<Action> = this.actions$
    .ofType(sideB.WAIT_FOR_PARTICIPATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideB.BRedeemAction(resp);
      });
    });

  @Effect()
  $redeem: Observable<Action> = this.actions$
    .ofType(sideB.BREDEEM)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideB.BRedeemSuccessAction(resp);
        }).catch(err => Observable.of(new sideB.BRedeemFailAction(err)));
      },
    );

  @Effect()
  $redeemSuccess: Observable<Action> = this.actions$
    .ofType(sideB.BREDEEM_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideB.InformRedeemedAction(resp);
      });
    });

  @Effect()
  $informRedeemed: Observable<Action> = this.actions$
    .ofType(sideB.INFORM_REDEEMED)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideB.InformRedeemedSuccessAction(resp);
        }).catch(err => Observable.of(new sideB.InformRedeemedFailAction(err)));
      },
    );

  @Effect()
  $informRedeemedSuccess: Observable<Action> = this.actions$
    .ofType(sideB.INFORM_REDEEMED_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideB.BDoneAction(resp);
      });
    });

  $done;

  constructor(private actions$: Actions, private store: Store<AppState>, private moscaService: MoscaService) {

  }
}
