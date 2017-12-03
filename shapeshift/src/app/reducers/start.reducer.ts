import * as swap from "../actions/start.action";
import {ShapeshiftStorage} from "../common/shapeshift-storage";
import {BtcCoinModel} from "../models/coins/btc-coin.model";
import {Coin} from "../models/coins/coin.model";
import {EthCoinModel} from "../models/coins/eth-coin.model";
import {SwapProcess} from "../models/swap-process.model";
import {SwapSpinners} from "../models/swap-spinners.enum";

export interface State {
  swapProcess: SwapProcess;
  link: string;
}

export const initialState: State = {
  swapProcess: {
    depositCoin: new EthCoinModel(),
    receiveCoin: new BtcCoinModel(),
    activeStep: 1,
    status: {
      initiated: SwapSpinners.Waiting,
      participated: SwapSpinners.Waiting,
      redeeming: SwapSpinners.Waiting,
      done: SwapSpinners.Waiting,
    },
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
          depositCoin: state.swapProcess.receiveCoin,
          receiveCoin: temp,
        },
      };
    }
    case swap.START_SWAP: {
      return {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          depositCoin: action.payload.depositCoin,
          receiveCoin: action.payload.receiveCoin,
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

    case swap.SET_DEPOSIT_AMOUNT: {
      const newState: any = {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          depositCoin: state.swapProcess.depositCoin
            .update({amount: action.payload} as Coin),
        },
      };
      return newState;
    }
    case swap.SET_RECEIVE_AMOUNT: {
      const newState: any = {
        ...state,
        swapProcess: {
          ...state.swapProcess,
          receiveCoin: state.swapProcess.receiveCoin
            .update({amount: action.payload} as Coin),
        },
      };
      return newState;
    }
    // case swap.COMPLETE_SWAP: {
    //   return {
    //     ...state,
    //     swapProcess: {
    //       ...state.swapProcess,
    //       activeStep: 3,
    //     },
    //   };
    // }
    // case swap.INFORM_INITIATED:
    // case swap.WAIT_FOR_INITIATE_SUCCESS: {
    //   return {
    //     ...state,
    //     swapProcess: {
    //       ...state.swapProcess,
    //       status: {
    //         ...state.swapProcess.status,
    //         initiated: SwapSpinners.Completed,
    //         participated: SwapSpinners.Active,
    //       }
    //     }
    //   }
    // }
    //
    // case swap.WAIT_FOR_PARTICIPATE_SUCCESS:
    // case swap.INFORM_PARTICIPATED: {
    //   return {
    //     ...state,
    //     swapProcess: {
    //       ...state.swapProcess,
    //       status: {
    //         ...state.swapProcess.status,
    //         initiated: SwapSpinners.Completed,
    //         participated: SwapSpinners.Completed,
    //         redeeming: SwapSpinners.Active,
    //       }
    //     }
    //   }
    // }
    // case swap.REDEEM_SUCCESS: {
    //   return {
    //     ...state,
    //     swapProcess: {
    //       ...state.swapProcess,
    //       status: {
    //         ...state.swapProcess.status,
    //         initiated: SwapSpinners.Completed,
    //         participated: SwapSpinners.Completed,
    //         redeeming: SwapSpinners.Completed,
    //         done: SwapSpinners.Completed,
    //       }
    //     }
    //   }
    // }
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
export const getSwapStatus = (state: State) => state.swapProcess.status;
