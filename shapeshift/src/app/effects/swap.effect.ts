import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import * as swapAction from '../actions/swap.action';


@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(swapAction.START_SWAP)
    .mergeMap((action: swapAction.StartSwapAction) => {
        console.log(action);
        //TODO generate address here
        return Observable.from([

        ]);
      },
    )
    .do(() => this.router.navigate(['app/jobs/declaration_274']));


  constructor(private actions$: Actions, private router: Router) {
  }
}
