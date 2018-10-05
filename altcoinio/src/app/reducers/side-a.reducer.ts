import * as sideA from "../actions/side-A.action";
import {Coin} from "../models/coins/coin.model";
import {SwapProgress} from "../models/swap-progress.enum";

export interface State {
  contractBin: any;
  contractTx: any;
  secret: string;
  hashedSecret: string;
  link: string;
  side: string;
  from: string;
  to: string;
  receiveAmount: number;
  depositAmount: number;
  progress: SwapProgress;
  address: string;
  loading: boolean;
  receiveCoin: Coin;
  depositCoin: Coin;
  generatingLink: boolean;
  errorMessage: string;
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
  side: undefined,
  from: undefined,
  to: undefined,
  receiveAmount: undefined,
  depositAmount: undefined,
  address: undefined,
  generatingLink: false,
  errorMessage: undefined,
};

export function reducer(state = initialState, action: sideA.Actions): State {
  switch (action.type) {
    case sideA.GENERATE_LINK: {
      return {
        ...state,
        receiveCoin: action.payload.coin,
        depositCoin: action.payload.depositCoin,
        generatingLink: true,
        errorMessage: undefined,
      };
    }
    case sideA.GENERATE_LINK_SUCCESS: {
      return {
        ...state,
        link: action.payload.order_id,
        side: action.payload.side,
        from: action.payload.from,
        to: action.payload.to,
        receiveAmount: action.payload.receiveAmount,
        depositAmount: action.payload.depositAmount,
        address: action.payload.address,
        generatingLink: false,
      };
    }
    case sideA.GENERATE_LINK_FAIL: {
      return {
        ...state,
        generatingLink: false,
        errorMessage: "Please try later",
      };
    }
    case sideA.PARTICIPATE: {
      // tslint:disable-next-line
      console.log("REDUCER sideA.PARTICIPATE", state);
      return {
        ...state,
        contractBin: action.payload.contractHex ? action.payload.contractHex : null,
        contractTx: action.payload.contractTxHex ? action.payload.contractTxHex : null,
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
        contractTx: action.payload.contractTxHex ? action.payload.contractTxHex : null,
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
export const getSwapLink = (state: State) => {
  return {
    link: state.link,
    side: state.side,
    from: state.from,
    to: state.to,
    receiveAmount: state.receiveAmount,
    depositAmount: state.depositAmount,
    address: state.address,
  };
};
export const getLinkGenerating = (state: State) => state.generatingLink;
export const getLinkErrorMessage = (state: State) => state.errorMessage;
