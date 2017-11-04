import * as swap from '../actions/swap.action';

export interface State {
  error: string;
}

export const initialState: State = {
  error: undefined,
};

export function reducer(state = initialState, action: swap.Actions): State {
  switch (action.type) {
    case swap.INITIATE_FAIL: {
      return {
        ...state,
        error: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}

export const getInititeError = (state: State) => state.error;
