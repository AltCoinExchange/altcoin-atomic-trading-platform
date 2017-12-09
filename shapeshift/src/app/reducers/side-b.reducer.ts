import * as sideB from "../actions/side-B.action";
import {Coin} from "../models/coins/coin.model";
import {SwapSpinners} from "../models/swap-spinners.enum";

export interface State {
  contractBin: any;
  contractTx: any;
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
  contractBin: undefined,
  contractTx: undefined,
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

export function reducer(state = initialState, action: sideB.Actions): State {
  switch (action.type) {

    case sideB.INITIATE: {
      console.log('INITIATE', action.payload);
      return {
        ...state,
        link: action.payload.link,
        status: {
          ...state.status,
          initiated: SwapSpinners.Active,
        },
        loading: true,
        receiveCoin: action.payload.depositCoin,
        depositCoin: action.payload.coin,
      };
    }
    case sideB.INITIATE_SUCCESS: {
      console.log('INITIATE', action.payload);
      return {
        ...state,
        status: {
          ...state.status
        },
        secret: action.payload.secret,
        hashedSecret: action.payload.secretHash,
        contractTx: action.payload.contractTxHex ? action.payload.contractTxHex : null,
        contractBin: action.payload.contractHex ? action.payload.contractHex : null
      };
    }
    case sideB.INFORM_INITIATE_SUCCESS: {
      return {
        ...state,
        status: {
          ...state.status,
          initiated: SwapSpinners.Completed,
          participated: SwapSpinners.Active,
        },
        loading: false,
      };
    }
    case sideB.WAIT_FOR_PARTICIPATE: {
      return {
        ...state,
        status: {
          ...state.status,
          initiated: SwapSpinners.Completed,
          participated: SwapSpinners.Active,
        },
        loading: false,
      };
    }
    case sideB.WAIT_FOR_PARTICIPATE_SUCCESS: {
      return {
        ...state,
        status: {
          ...state.status,
          participated: SwapSpinners.Completed,
          redeeming: SwapSpinners.Active,
        },
        loading: false,
      };
    }
    case sideB.BREDEEM_SUCCESS: {
      return {
        ...state,
        status: {
          ...state.status,
          redeeming: SwapSpinners.Completed,
          done: SwapSpinners.Completed,
        },
        loading: false,
      };
    }

    default: {
      return state;
    }

  }
}

export const getBLink = (state: State) => state.link;
export const getBStatus = (state: State) => state.status;
export const getBLoading = (state: State) => state.loading;
export const getBReceiveCoin = (state: State) => state.receiveCoin;
export const getBDepositCoin = (state: State) => state.depositCoin;
export const getBSecret = (state: State) => state.secret;
export const getBHashedSecret = (state: State) => state.hashedSecret;
export const getBContractBin = (state: State) => state.contractBin;
export const getBContractTx = (state: State) => state.contractTx;
