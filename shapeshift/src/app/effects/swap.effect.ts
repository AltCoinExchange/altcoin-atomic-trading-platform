import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as swapAction from '../actions/swap.action';
import * as btcSelector from '../selectors/btc-wallet.selector';
import {Go} from '../actions/router.action';
import {AppState} from '../reducers/app.state';
import {LinkService} from '../services/link.service';


@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(swapAction.START_SWAP)
    .map(toPayload)
    .withLatestFrom(this.store.select(btcSelector.getBtcWallet))
    .mergeMap(([depositCoin, btcWallet]) => {
        return this.linkService.generateLink(depositCoin, btcWallet).mergeMap(link => {
          return Observable.from([
            new swapAction.SetLinkAction(link),
            new Go({
              path: ['/transfer'],
            }),
          ]);
        });
      },
    );


  constructor(private linkService: LinkService, private actions$: Actions, private store: Store<AppState>) {
  }
}
