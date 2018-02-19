import {Action} from "@ngrx/store";

export const SET_BTC_WALLET = "SET_BTC_WALLET";
export const SET_ETH_WALLET = "SET_ETH_WALLET";
export const FUND_ETH_WALLET = "FUND_ETH_WALLET";
export const SET_REP_WALLET = "SET_REP_WALLET";

export class SetBtcWalletAction implements Action {
  readonly type = SET_BTC_WALLET;

  constructor(public payload: { xprivkey, WIF, address }) {

  }
}

export class SetRepWalletAction implements Action {
  readonly type = SET_REP_WALLET;

  constructor(public payload: any) {

  }
}

export class SetEthWalletAction implements Action {
  readonly type = SET_ETH_WALLET;

  constructor(public payload: any) {

  }
}

export class FundEthWalletAction implements Action {
  readonly type = FUND_ETH_WALLET;

  constructor(public payload: any) {

  }
}

export type Actions =
  SetBtcWalletAction
  | SetEthWalletAction
  | SetRepWalletAction
  | FundEthWalletAction
  ;
