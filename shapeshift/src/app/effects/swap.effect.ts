import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as startAction from '../actions/start.action';
import * as swapAction from '../actions/swap.action';
import * as auditContractAction from '../actions/swap-audit.action';
import * as walletSelector from '../selectors/wallets.selector';
import {Go} from '../actions/router.action';
import {AppState} from '../reducers/app.state';
import {LinkService} from '../services/link.service';
import {SwapService} from '../services/swap.service';
import {QuoteService} from '../services/quote.service';


@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(startAction.START_SWAP)
    .map(toPayload)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([data, wallets]) => {
        return this.linkService.generateLink(data, wallets).mergeMap(link => {
          return Observable.from([
            new startAction.SetLinkAction(link),
            new Go({
              path: ['/transfer'],
            }),
            new startAction.WaitForInitiateAction(link),
          ]);
        });
      },
    );

  @Effect()
  initiate$: Observable<Action> = this.actions$
    .ofType(swapAction.INITIATE)
    .map(toPayload)
    .mergeMap(payload => {
      return this.swapService.initiate(payload)
        .mergeMap(res => {
          return Observable.from([
            new swapAction.InitiateSuccessAction(res),
            new startAction.InformInitiatedAction({
              link: payload.link,
              data: res,
            }),
            new Go({
              path: ['/complete'],
            }),
          ]);
        })
        .catch(err => Observable.of(new swapAction.InitiateFailAction(err)));
    });

  @Effect()
  auditContract$: Observable<Action> = this.actions$
    .ofType(auditContractAction.SWAP_AUDIT)
    .map(toPayload)
    .mergeMap(payload => {
      return this.swapService.auditContract(payload).map(r => {
        return new auditContractAction.SwapAuditSuccessAction(r);
      });
    });

  @Effect()
  waitForInitiate$: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_INITIATE)
    .map(toPayload)
    .switchMap(payload => {
      return this.swapService.waitForInitiate(payload).map(a => {
        return new startAction.WaitForInitiateSuccessAction(a);
      });
    });

  @Effect()
  informInitiated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_INITIATED)
    .map(toPayload)
    .mergeMap(payload => {
      this.swapService.informInitiated(payload);
      return Observable.empty();
    });


  constructor(private linkService: LinkService,
              private quoteService: QuoteService,
              private actions$: Actions,
              private store: Store<AppState>,
              private swapService: SwapService) {
  }
}
