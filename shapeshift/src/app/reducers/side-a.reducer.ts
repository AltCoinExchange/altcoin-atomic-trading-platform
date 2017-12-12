import * as sideA from "../actions/side-A.action";
import {Coin} from "../models/coins/coin.model";
import {SwapProgress} from "../models/swap-progress.enum";

export interface State {
  contractBin: any;
  contractTx: any;
  secret: string;
  hashedSecret: string;
  link: string;
  progress: SwapProgress,
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
  progress: undefined,
  receiveCoin: undefined,
  depositCoin: undefined,
};

export function reducer(state = initialState, action: sideA.Actions): State {
  switch (action.type) {
    case sideA.GENERATE_LINK: {
      return {
        ...state,
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
    case sideA.PARTICIPATE: {
      // tslint:disable-next-line
      console.log("REDUCER sideA.PARTICIPATE", state);
      return {
        ...state,
        contractBin: action.payload.contractHex ? action.payload.contractHex : null,
        contractTx: action.payload.contractTx ? action.payload.contractTx : null,
        loading: true
      };
    }
    case sideA.INFORM_PARTICIPATE: {
      // tslint:disable-next-line
      console.log("REDUCER sideA.INFORM_PARTICIPATE", action.payload);
      return {
        ...state,
        progress: SwapProgress.Participated,
        contractBin: action.payload.contractHex ? action.payload.contractHex : null,
        contractTx: action.payload.contractTx ? action.payload.contractTx : null,
        loading: true
      };
    }
    case sideA.WAIT_FOR_INITIATE: {
      return {
        ...state,
      };
    }
    case sideA.WAIT_FOR_INITIATE_SUCCESS : {
      return {
        ...state,
        progress: SwapProgress.Initiated,
        secret: action.payload.secret,
        hashedSecret: action.payload.hashedSecret
      };
    }
    case sideA.PARTICIPATE_SUCCESS: {
      return {
        ...state,
        progress: SwapProgress.Participated,
        loading: true,
        receiveCoin: action.payload.coin,
        depositCoin: action.payload.depositCoin
      };
    }
    case sideA.AREDEEM_SUCCESS: {
      return {
        ...state,
        progress: SwapProgress.Redeemed,
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
export const getAProgress = (state: State) => state.progress;
export const getALoading = (state: State) => state.loading;
export const getAReceiveCoin = (state: State) => state.receiveCoin;
export const getADepositCoin = (state: State) => state.depositCoin;
export const getASecret = (state: State) => state.secret;
export const getAHashedSecret = (state: State) => state.hashedSecret;
export const getAContractBin = (state: State) => state.contractBin;
export const getAContractTx = (state: State) => state.contractTx;
