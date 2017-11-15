import {Action} from '@ngrx/store';

export const GET_ETH_BALANCE = 'GET_ETH_BALANCE';
export const GET_ETH_BALANCE_SUCCESS = 'GET_ETH_BALANCE_SUCCESS';

export class GetEthBalanceAction implements Action {
  readonly type = GET_ETH_BALANCE;

  constructor(public payload?) {

  }
}

export class GetEthBalanceSuccessAction implements Action {
  readonly type = GET_ETH_BALANCE_SUCCESS;

  constructor(public payload: any) {

  }
}


export type Actions =
  GetEthBalanceAction
  | GetEthBalanceSuccessAction
  ;
