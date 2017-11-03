import {Action} from '@ngrx/store';

export const SWAP_DEPOSIT_RECEIVE_COINS = 'SWAP_DEPOSIT_RECEIVE_COINS';

export class SwapDepositReceiveCoinsAction implements Action {
  readonly type = SWAP_DEPOSIT_RECEIVE_COINS;
}

export type Actions =
  SwapDepositReceiveCoinsAction
  ;
