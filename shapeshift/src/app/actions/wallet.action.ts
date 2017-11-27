import {Action} from '@ngrx/store';

export const SET_BTC_WALLET = 'SET_BTC_WALLET';
export const SET_ETH_WALLET = 'SET_ETH_WALLET';

export class SetBtcWalletAction implements Action {
  readonly type = SET_BTC_WALLET;

  constructor(public payload: {xprivkey, WIF}) {

  }
}

export class SetEthWalletAction implements Action {
  readonly type = SET_ETH_WALLET;

  constructor(public payload: any) {

  }
}

export type Actions =
  SetBtcWalletAction
    | SetEthWalletAction
  ;
