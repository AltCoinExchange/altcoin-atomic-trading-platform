import * as balance from "../actions/balance.action";

export interface WalletRecord {
  address: string;
  balance: string;
}

export interface State {
  ETH: WalletRecord;
  BTC: WalletRecord;
  ethLoading: boolean;
  btcLoading: boolean;
}

export const initialState: State = {
  ETH: undefined,
  BTC: undefined,
  ethLoading: false,
  btcLoading: false,
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
export const getETHBalance = (state: State) => state.ETH;
export const getBTCBalance = (state: State) => state.BTC;
