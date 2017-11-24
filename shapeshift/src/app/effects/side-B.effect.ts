import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as sideB from "../actions/side-B.action";

@Injectable()
export class SideBEffect {

  @Effect()
  $initiate: Observable<Action> = this.actions$
    .ofType(sideB.INITIATE)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideB.InitiateSuccessAction(resp);
        }).catch(err => Observable.of(new sideB.InitiateFailAction(err)));
      },
    );

  @Effect()
  $initiateSuccess: Observable<Action> = this.actions$
    .ofType(sideB.INITIATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideB.InformInitiateAction(resp);
      });
    });

  @Effect()
  $informInitiate: Observable<Action> = this.actions$
    .ofType(sideB.INFORM_INITIATE)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideB.InformInitiateSuccessAction(resp);
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

  constructor(private actions$: Actions) {

  }
}
