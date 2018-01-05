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

export const GET_BTC_BALANCE = 'GET_BTC_BALANCE';
export const GET_BTC_BALANCE_SUCCESS = 'GET_BTC_BALANCE_SUCCESS';
export class GetBtcBalanceAction implements Action {
  readonly type = GET_BTC_BALANCE;

  constructor(public payload?) {

  }
}
export class GetBtcBalanceSuccessAction implements Action {
  readonly type = GET_BTC_BALANCE_SUCCESS;

  constructor(public payload: any) {

  }
}

export const GET_TOKEN_BALANCE = 'GET_TOKEN_BALANCE';
export const GET_TOKEN_BALANCE_SUCCESS = 'GET_TOKEN_BALANCE_SUCCESS';
export class GetTokenBalanceAction implements Action {
  readonly type = GET_TOKEN_BALANCE;

  constructor(public payload?) {

  }
}
export class GetTokenBalanceSuccessAction implements Action {
  readonly type = GET_TOKEN_BALANCE_SUCCESS;

  constructor(public payload: any) {

  }
}

export const GET_REP_BALANCE = 'GET_REP_BALANCE';
export const GET_REP_BALANCE_SUCCESS = 'GET_REP_BALANCE_SUCCESS';
export class GetRepBalanceAction implements Action {
  readonly type = GET_REP_BALANCE;

  constructor(public payload?) {

  }
}
export class GetRepBalanceSuccessAction implements Action {
  readonly type = GET_REP_BALANCE_SUCCESS;

  constructor(public payload: any) {

  }
}

export type Actions =
  GetEthBalanceAction
  | GetEthBalanceSuccessAction
  | GetBtcBalanceAction
  | GetBtcBalanceSuccessAction
  | GetRepBalanceAction
  | GetRepBalanceSuccessAction
  | GetTokenBalanceAction
  | GetTokenBalanceSuccessAction
  ;
