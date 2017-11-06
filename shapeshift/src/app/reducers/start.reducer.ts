import {SwapProcess} from '../models/swap-process.model';
import * as swap from '../actions/start.action';
import {Coin} from '../models/coin.model';

export interface State {
  swapProcess: SwapProcess;
  link: string;
}

export const initialState: State = {
  swapProcess: {
    depositCoin: {
      name: 'ETH',
      amount: undefined,
      icon: 'assets/icon/eth-icon.png',
      iconOutline: 'assets/icon/eth-icon-o.png',
    } as Coin,
    receiveCoin: {
      name: 'BTC',
      amount: undefined,
      icon: 'assets/icon/btc-icon.png',
      iconOutline: 'assets/icon/btc-icon-o.png',
    } as Coin,
    submitAmount: false,
    showQRCode: false,
    showLink: false,
    activeStep: 1,
  } as SwapProcess,
  link: undefined,
};

export function reducer(state = initialState, action: swap.Actions): State {
  switch (action.type) {
    case swap.SWAP_DEPOSIT_RECEIVE_COINS: {
      const temp = state.swapProcess.depositCoin;
      return {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          depositCoin: {
            ...state.swapProcess.receiveCoin,
          },
          receiveCoin: {...temp},
        },
      };
    }
    case swap.START_SWAP: {
      return {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          depositCoin: action.payload,
          activeStep: 2,
        },
      };
    }
    case swap.SET_ACTIVE_STEP: {
      return {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          activeStep: action.payload,
        },
      };
    }
    case swap.SET_LINK: {
      return {
        ...state,
        link: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getSwapProcess = (state: State) => state.swapProcess;
export const getDepositCoin = (state: State) => state.swapProcess.depositCoin;
export const getReceiveCoin = (state: State) => state.swapProcess.receiveCoin;
export const getLink = (state: State) => state.link;
export const getActiveStep = (state: State) => state.swapProcess.activeStep;