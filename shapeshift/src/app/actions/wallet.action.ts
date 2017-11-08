import {Action} from '@ngrx/store';
import {BtcWalletModel} from '../models/wallets/btc-wallet.model';
import {EthWalletModel} from '../models/wallets/eth-wallet.model';

export const SET_BTC_WALLET = 'SET_BTC_WALLET';
export const SET_ETH_WALLET = 'SET_ETH_WALLET';

export class SetBtcWalletAction implements Action {
  readonly type = SET_BTC_WALLET;

  constructor(public payload: BtcWalletModel) {

  }
}

export class SetEthWalletAction implements Action {
  readonly type = SET_ETH_WALLET;

  constructor(public payload: EthWalletModel) {

  }
}

export type Actions =
  SetBtcWalletAction
    | SetEthWalletAction
  ;
