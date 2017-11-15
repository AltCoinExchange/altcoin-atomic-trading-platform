import * as balance from '../actions/balance.action';

export interface WalletRecord {
  address: string,
  balance: string,
}

export interface State {
  ETH: WalletRecord,
  BTC: WalletRecord,
  loading: boolean,
}

export const initialState: State = {
  ETH: undefined,
  BTC: undefined,
  loading: false,
};

export function reducer(state = initialState, action: balance.Actions): State {
  switch (action.type) {

    case balance.GET_ETH_BALANCE: {
      return {
        ...state,
        loading: true,
      };
    }

    case balance.GET_ETH_BALANCE_SUCCESS: {
      return {
        ...state,
        ETH: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }

  }
}
export const getLoading = (state: State) => state.loading;
export const getETHBalance = (state: State) => state.ETH;
