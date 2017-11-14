import {Action} from '@ngrx/store';

export const INITIATE = 'INITIATE';
export const INITIATE_SUCCESS = 'INITIATE_SUCCESS';
export const INITIATE_FAIL = 'INITIATE_FAIL';

export const LOAD_LOCAL_INITIATE_DATA = 'LOAD_LOCAL_INITIATE_DATA';


export class InitiateAction implements Action {
  readonly type = INITIATE;

  constructor(public payload: {
    address,
    amount,
    link,
    coin,
    depositCoin
  }) {
    console.log(payload);

  }
}

export class InitiateSuccessAction implements Action {
  readonly type = INITIATE_SUCCESS;

  constructor(public payload: any) {

  }
}

export class InitiateFailAction implements Action {
  readonly type = INITIATE_FAIL;

  constructor(public payload: any) {

  }
}

export class LoadInitiateDataAction implements Action {
  readonly type = LOAD_LOCAL_INITIATE_DATA;

  constructor(public payload: string) {

  }
}

export type Actions =
  InitiateAction
  | InitiateSuccessAction
  | InitiateFailAction
  | LoadInitiateDataAction
  ;
