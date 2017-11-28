import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Go} from "../actions/router.action";
import * as sideB from "../actions/side-B.action";
import {AppState} from "../reducers/app.state";
import {getBLink} from "../selectors/side-b.selector";
import {MoscaService} from "../services/mosca.service";

@Injectable()
export class SideBEffect {

  @Effect()
  $initiate: Observable<Action> = this.actions$
    .ofType(sideB.INITIATE)
    .map(toPayload)
    .switchMap((payload) => {
        const coin = payload.coin;
        return coin.Initiate(payload.address).map(resp => {
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
    .withLatestFrom(this.store.select(getBLink))
    .mergeMap(([payload, link]) => {
        console.log("should inform", payload, link);
        // TODO payload contains SECRET ------- TODO please correct this
        console.log("TODO payload contains SECRET ------- TODO please correct this");
        return this.moscaService.informInitiate(link, payload).map(() => {
          return new sideB.InformInitiateSuccessAction(payload);
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
