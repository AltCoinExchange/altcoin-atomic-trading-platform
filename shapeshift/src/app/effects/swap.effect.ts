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
        console.log(action);
        //TODO generate address here
        return Observable.from([
          new Go({
            path: ['/transfer'],
          }),
        ]);
      },
    );


  constructor(private actions$: Actions, private router: Router) {
  }
}
