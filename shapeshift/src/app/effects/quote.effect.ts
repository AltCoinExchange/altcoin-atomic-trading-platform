import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as quoteAction from '../actions/quote.action';
import {QuoteService} from '../services/quote.service';


@Injectable()
export class QuoteEffect {

  @Effect()
  loadQuotes$: Observable<Action> = this.actions$
    .ofType(quoteAction.LOAD_QUOTE)
    .flatMap(() => {
        return this.quoteService.getQuotes()
          .map(quotes => new quoteAction.LoadQuoteSuccessAction(quotes));
      },
    );

  constructor(private quoteService: QuoteService,
              private actions$: Actions) {
  }
}
