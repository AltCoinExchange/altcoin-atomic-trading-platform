import {Action} from '@ngrx/store';
import {Coin} from '../models/coin.model';

export const SWAP_DEPOSIT_RECEIVE_COINS = 'SWAP_DEPOSIT_RECEIVE_COINS';
export const START_SWAP = 'START_SWAP';

export class SwapDepositReceiveCoinsAction implements Action {
  readonly type = SWAP_DEPOSIT_RECEIVE_COINS;
}

export class StartSwapAction implements Action {
  readonly type = START_SWAP;

  constructor(public payload: Coin) {

  }
}

export type Actions =
  SwapDepositReceiveCoinsAction
  | StartSwapAction
  ;
