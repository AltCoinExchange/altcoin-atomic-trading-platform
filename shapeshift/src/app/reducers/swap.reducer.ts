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
  };
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

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getInititeError = (state: State) => state.error;
export const getInitiateLoading = (state: State) => state.loading;
export const getInitiateData = (state: State) => state.initiateData;
export const getSwapCoins = (state: State) => state.coins;
