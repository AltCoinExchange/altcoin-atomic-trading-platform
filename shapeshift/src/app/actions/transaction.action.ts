import {Action} from '@ngrx/store';

export const LOAD_TRANSACTION = 'LOAD_TRANSACTION';
export const LOAD_TRANSACTION_SUCCESS = 'LOAD_TRANSACTION_SUCCESS';
export const LOAD_TRANSACTION_FAIL = 'LOAD_TRANSACTION_FAIL';


export class LoadTransactionAction implements Action {
  readonly type = LOAD_TRANSACTION;

  constructor(public payload?) {
  }
}

export class LoadTransactionSuccessAction implements Action {
  readonly type = LOAD_TRANSACTION_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadTransactionFailAction implements Action {
  readonly type = LOAD_TRANSACTION_FAIL;

  constructor(public payload: any) {

  }
}

export type Actions =
  LoadTransactionAction
  | LoadTransactionSuccessAction
  | LoadTransactionFailAction
  ;
