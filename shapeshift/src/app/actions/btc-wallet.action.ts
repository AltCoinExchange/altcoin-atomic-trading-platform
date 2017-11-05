import {Action} from '@ngrx/store';
import {BtcWalletModel} from '../models/btc-wallet.model';

export const SET_BTC_WALLET = 'SET_BTC_WALLET';

export class SetBtcWalletAction implements Action {
  readonly type = SET_BTC_WALLET;

  constructor(public payload: BtcWalletModel) {

  }
}

export type Actions =
  SetBtcWalletAction
  ;
