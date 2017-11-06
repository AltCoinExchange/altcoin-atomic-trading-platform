import {Action} from '@ngrx/store';
import {Coin} from '../models/coin.model';

export const SWAP_DEPOSIT_RECEIVE_COINS = 'SWAP_DEPOSIT_RECEIVE_COINS';
export const START_SWAP = 'START_SWAP';
export const SET_LINK = 'SET_LINK';

export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';


export class SwapDepositReceiveCoinsAction implements Action {
  readonly type = SWAP_DEPOSIT_RECEIVE_COINS;
}

export class StartSwapAction implements Action {
  readonly type = START_SWAP;

  constructor(public payload: Coin) {

  }
}

export class SetLinkAction implements Action {
  readonly type = SET_LINK;

  constructor(public payload: string) {

  }
}


export class SetActiveStepAction implements Action {
  readonly type = SET_ACTIVE_STEP;

  constructor(public payload: number) {

  }
}

export type Actions =
  SwapDepositReceiveCoinsAction
  | StartSwapAction
  | SetLinkAction
  | SetActiveStepAction
  ;
