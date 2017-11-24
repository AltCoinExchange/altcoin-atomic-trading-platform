import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as sideA from "../actions/side-A.action";

@Injectable()
export class SideAEffect {

  @Effect()
  $generateLink: Observable<Action> = this.actions$
    .ofType(sideA.GENERATE_LINK)
    .mergeMap(() => {
        return Observable.empty().map(resp => { // TODO provide implementation
          return new sideA.GenerateLinkSuccessAction(resp);
        }).catch(err => Observable.of(new sideA.GenerateLinkFailAction(err)));
      },
    );

  @Effect()
  $generateLinkSuccess: Observable<Action> = this.actions$
    .ofType(sideA.GENERATE_LINK_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.WaitForInitiateAction(resp);
      });
    });

  @Effect()
  $waitForInitiate: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_INITIATE)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.WaitForInitiateSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.WaitForInitiateFailAction(err)));
    });

  @Effect()
  $waitForInitiateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_INITIATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ParticipateAction(resp);
      });
    });

  @Effect()
  $participate: Observable<Action> = this.actions$
    .ofType(sideA.PARTICIPATE)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ParticipateSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ParticipateFailAction(err)));
    });

  @Effect()
  $participateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.PARTICIPATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.InformParticipateAction(resp);
      });
    });

  @Effect()
  $informParticipate: Observable<Action> = this.actions$
    .ofType(sideA.INFORM_PARTICIPATE)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.InformParticipateSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.InformParticipateFailAction(err)));
    });

  @Effect()
  $informParticipateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.INFORM_PARTICIPATE_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.WaitForBRedeemAction(resp);
      });
    });

  @Effect()
  $waitForBRedeem: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_BREDEEM)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.WaitForBRedeemSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.WaitForBRedeemFailAction(err)));
    });

  @Effect()
  $waitForBRedeemSuccess: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_BREDEEM_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ExtractSecretAction(resp);
      });
    });

  @Effect()
  $extractSecret: Observable<Action> = this.actions$
    .ofType(sideA.EXTRACT_SECRET)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ExtractSecretSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ExtractSecretFailAction(err)));
    });

  @Effect()
  $extractSecretSuccess: Observable<Action> = this.actions$
    .ofType(sideA.EXTRACT_SECRET_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ARedeemAction(resp);
      });
    });

  @Effect()
  $redeemA: Observable<Action> = this.actions$
    .ofType(sideA.AREDEEM)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ARedeemSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ARedeemFailAction(err)));
    });

  @Effect()
  $redeemASuccess: Observable<Action> = this.actions$
    .ofType(sideA.AREDEEM_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ADoneAction(resp);
      });
    });


  $done;

  constructor(private actions$: Actions) {

  }
}
