import {Action} from '@ngrx/store';
import {Quote} from '../models/quote.model';

export const LOAD_QUOTE = 'LOAD_QUOTE';
export const LOAD_QUOTE_SUCCESS = 'LOAD_QUOTE_SUCCESS';
export const LOAD_QUOTE_SINGLE_SUCCESS = 'LOAD_QUOTE_SINGLE_SUCCESS';
export const LOAD_QUOTE_FAIL = 'LOAD_QUOTE_FAIL';


export class LoadQuoteAction implements Action {
  readonly type = LOAD_QUOTE;

  constructor(public payload?) {
  }
}

export class LoadQuoteSuccessAction implements Action {
  readonly type = LOAD_QUOTE_SUCCESS;

  constructor(public payload: Quote[]) {
  }
}

export class LoadQuoteSingleSuccessAction implements Action {
  readonly type = LOAD_QUOTE_SINGLE_SUCCESS;

  constructor(public payload: Quote) {

  }
}

export class LoadQuoteFailAction implements Action {
  readonly type = LOAD_QUOTE_FAIL;

  constructor(public payload: any) {

  }
}

export type Actions =
  LoadQuoteAction
  | LoadQuoteSuccessAction
  | LoadQuoteSingleSuccessAction
  | LoadQuoteFailAction
  ;
