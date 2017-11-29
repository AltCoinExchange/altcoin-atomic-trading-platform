import * as sideA from "../actions/side-A.action";
import {SwapSpinners} from "../models/swap-spinners.enum";

export interface State {
  link: string;
  status: any;
}

export const initialState: State = {
  link: undefined,
  status: {
    initiated: SwapSpinners.Waiting,
    participated: SwapSpinners.Waiting,
    redeeming: SwapSpinners.Waiting,
    done: SwapSpinners.Waiting,
  },
};

export function reducer(state = initialState, action: sideA.Actions): State {
  switch (action.type) {

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
        }
      };
    }

    default: {
      return state;
    }

  }
}

export const getLink = (state: State) => state.link;
export const getAStatus = (state: State) => state.status;
