import * as balance from "../actions/balance.action";

export interface WalletRecord {
  address: string;
  balance: string;
}

export interface State {
  ETH: WalletRecord;
  BTC: WalletRecord;
  REP: WalletRecord;
  ethLoading: boolean;
  btcLoading: boolean;
  repLoading: boolean;
}

export const initialState: State = {
  ETH: undefined,
  BTC: undefined,
  REP: undefined,
  ethLoading: false,
  btcLoading: false,
  repLoading: false,
};

export function reducer(state = initialState, action: balance.Actions): State {
  switch (action.type) {
    case balance.GET_ETH_BALANCE: {
      return {
        ...state,
        ethLoading: true,
      };
    }
    case balance.GET_BTC_BALANCE: {
      return {
        ...state,
        btcLoading: true,
      };
    }
    case balance.GET_REP_BALANCE: {
      return {
        ...state,
        repLoading: true,
      };
    }
    case balance.GET_REP_BALANCE_SUCCESS: {
      return {
        ...state,
        REP: action.payload,
        repLoading: false,
      };
    }
    case balance.GET_ETH_BALANCE_SUCCESS: {
      return {
        ...state,
        ETH: action.payload,
        ethLoading: false,
      };
    }

    case balance.GET_BTC_BALANCE_SUCCESS: {
      return {
        ...state,
        BTC: action.payload,
        btcLoading: false,
      };
    }

    default: {
      return state;
    }

  }
}

export const getEthLoading = (state: State) => state.ethLoading;
export const getBtcLoading = (state: State) => state.btcLoading;
export const getRepLoading = (state: State) => state.repLoading;
export const getETHBalance = (state: State) => state.ETH;
export const getBTCBalance = (state: State) => state.BTC;
export const getREPBalance = (state: State) => state.REP;
