import {Action} from '@ngrx/store';

export const INITIATE = 'INITIATE';
export const INITIATE_SUCCESS = 'INITIATE_SUCCESS';
export const INITIATE_FAIL = 'INITIATE_FAIL';


export class InitiateAction implements Action {
  readonly type = INITIATE;

  constructor(public payload: any) {

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

export type Actions =
  InitiateAction
  | InitiateSuccessAction
  | InitiateFailAction
  ;
