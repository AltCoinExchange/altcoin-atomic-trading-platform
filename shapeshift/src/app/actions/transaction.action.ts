import {Action} from '@ngrx/store';
import {TransactionModel} from "../models/transaction.model";

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

  constructor(public payload: TransactionModel) {
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
