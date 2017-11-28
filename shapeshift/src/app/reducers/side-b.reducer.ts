import * as sideB from "../actions/side-B.action";
import {SwapSpinners} from "../models/swap-spinners.enum";

export interface State {
  link: string;
  status: any;
  loading: boolean;
}

export const initialState: State = {
  link: undefined,
  loading: false,
  status: {
    initiated: SwapSpinners.Waiting,
    participated: SwapSpinners.Waiting,
    redeeming: SwapSpinners.Waiting,
    done: SwapSpinners.Waiting,
  },
};

export function reducer(state = initialState, action: sideB.Actions): State {
  switch (action.type) {

    case sideB.INITIATE: {
      return {
        ...state,
        link: action.payload.link,
        status: {
          ...state.status,
          initiated: SwapSpinners.Active,
        },
        loading: true,
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

    default: {
      return state;
    }

  }
}

export const getBLink = (state: State) => state.link;
export const getBStatus = (state: State) => state.status;
export const getBLoading = (state: State) => state.loading;
