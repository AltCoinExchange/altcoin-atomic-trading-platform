import * as sideA from "../actions/side-A.action";
import {Coin} from "../models/coins/coin.model";
import {SwapSpinners} from "../models/swap-spinners.enum";

export interface State {
  secret: string,
  hashedSecret: string,
  link: string;
  status: any;
  loading: boolean;
  receiveCoin: Coin;
  depositCoin: Coin;
}

export const initialState: State = {
  secret: undefined,
  hashedSecret: undefined,
  link: undefined,
  loading: false,
  status: {
    initiated: SwapSpinners.Waiting,
    participated: SwapSpinners.Waiting,
    redeeming: SwapSpinners.Waiting,
    done: SwapSpinners.Waiting,
  },
  receiveCoin: undefined,
  depositCoin: undefined,
};

export function reducer(state = initialState, action: sideA.Actions): State {
  switch (action.type) {
    case sideA.PARTICIPATE: {
      // tslint:disable-next-line
      console.log("REDUCER sideA.PARTICIPATE", state);
      return {
        ...state,
        status: {
          ...state.status,
          participated: SwapSpinners.Active,
        },
        loading: true,
        receiveCoin: action.payload.coin,
        depositCoin: action.payload.depositCoin,
      };
    }
    case sideA.INFORM_PARTICIPATE: {
      return {
        ...state,
        status: {
          ...state.status,
          participated: SwapSpinners.Completed,
          redeemed: SwapSpinners.Active,
        },
        loading: true,
        receiveCoin: action.payload.coin,
        depositCoin: action.payload.depositCoin,
      };
    }
    case sideA.GENERATE_LINK_SUCCESS: {
      return {
        ...state,
        link: action.payload,
      };
    }
    case sideA.WAIT_FOR_INITIATE: {
      return {
        ...state,
        status: {
          ...state.status,
          initiated: SwapSpinners.Active,
        }
      };
    }
    case sideA.WAIT_FOR_INITIATE_SUCCESS : {
      return {
        ...state,
        status: {
          ...state.status,
          initiated: SwapSpinners.Completed,
          participated: SwapSpinners.Active,
        }
      };
    }
    case sideA.PARTICIPATE_SUCCESS: {
      return {
        ...state,
        status: {
          ...state.status,
          participated: SwapSpinners.Completed,
          redeeming: SwapSpinners.Active,
        },
        loading: true,
        receiveCoin: action.payload.coin,
        depositCoin: action.payload.depositCoin
      };
    }

    default: {
      return state;
    }

  }
}

export const getALink = (state: State) => state.link;
export const getAStatus = (state: State) => state.status;
export const getALoading = (state: State) => state.loading;
export const getAReceiveCoin = (state: State) => state.receiveCoin;
export const getADepositCoin = (state: State) => state.depositCoin;
