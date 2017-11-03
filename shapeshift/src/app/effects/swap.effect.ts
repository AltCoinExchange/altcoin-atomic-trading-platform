import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import * as swapAction from '../actions/swap.action';
import {Go} from '../actions/router.action';


@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(swapAction.START_SWAP)
    .mergeMap((action: swapAction.StartSwapAction) => {
        //TODO generate address here

      //TODO use array instead of object
        const data = {
          t: new Date(),
          a: action.payload.amount,
          b: 'n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG', //fake address
        };
        const stringified = JSON.stringify(data);
        const link = btoa(stringified);
        return Observable.from([
          new swapAction.SetLinkAction(link),
          new Go({
            path: ['/transfer'],
          }),
        ]);
      },
    );


  constructor(private actions$: Actions, private router: Router) {
  }
}
