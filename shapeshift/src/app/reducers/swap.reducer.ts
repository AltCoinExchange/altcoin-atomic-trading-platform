import * as swap from "../actions/swap.action";
import {ShapeshiftStorage} from "../common/shapeshift-storage";
import {Coin} from "../models/coins/coin.model";

export interface State {
  error: string;
  loading: boolean;
  initiateData: any;
  link: string;
  coins: {
    receiveCoin: Coin,
    depositCoin: Coin,
  },
}

export const initialState: State = {
  error: undefined,
  loading: false,
  initiateData: undefined,
  link: undefined,
  coins: {
    receiveCoin: undefined,
    depositCoin: undefined,
  },
};

export function reducer(state = initialState, action: swap.Actions): State {
  switch (action.type) {
    case swap.INITIATE: {
      return {
        ...state,
        error: null,
        loading: true,
        link: action.payload.link,
        coins: {
          receiveCoin: action.payload.coin,
          depositCoin: action.payload.depositCoin,
        },
      };
    }
    case swap.INITIATE_SUCCESS: {
      ShapeshiftStorage.set(state.link, JSON.stringify(action.payload));
      return {
        ...state,
        error: null,
        loading: false,
        initiateData: action.payload,
      };
    }
    case swap.INITIATE_FAIL: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    }
    case swap.LOAD_LOCAL_INITIATE_DATA: {
      const link = action.payload;
      const data: string = ShapeshiftStorage.get(link);
      return {
        ...state,
        initiateData: data && data.length > 0 ? JSON.parse(data) : null,
      };
    }
    default: {
      return state;
    }
  }
}

export const getInititeError = (state: State) => state.error;
export const getInitiateLoading = (state: State) => state.loading;
export const getInitiateData = (state: State) => state.initiateData;
export const getSwapCoins = (state: State) => state.coins;
