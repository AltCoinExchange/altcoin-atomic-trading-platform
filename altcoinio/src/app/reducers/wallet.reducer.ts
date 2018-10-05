import * as walletAction from "../actions/wallet.action";
import {AltcoinioStorage} from "../common/altcoinio-storage";

export interface State {
  BTC: any;
  ETH: any;
  REP: any;
}

export const initialState: State = {
  BTC: undefined,
  ETH: undefined,
  REP: undefined,
};

export function reducer(state = initialState, action: walletAction.Actions) {
  switch (action.type) {
    case walletAction.SET_BTC_WALLET: {
      AltcoinioStorage.set("btcprivkey", action.payload.xprivkey);
      AltcoinioStorage.set("btc-wif", action.payload.WIF);
      return {
        ...state,
        BTC: action.payload,
      };
    }
    case walletAction.SET_ETH_WALLET: {
      AltcoinioStorage.set("ethprivkey", action.payload.privateKey);
      AltcoinioStorage.set("ethkeystore", JSON.stringify(action.payload.keystore));
      return {
        ...state,
        ETH: action.payload,
      };
    }
    case walletAction.SET_REP_WALLET: {
      return {
        ...state,
        REP: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getWallets = (state: State) => state;
