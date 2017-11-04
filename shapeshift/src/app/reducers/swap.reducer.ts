import * as swap from '../actions/swap.action';

export interface State {
  error: string;
  loading: boolean;
}

export const initialState: State = {
  error: undefined,
  loading: false,
};

export function reducer(state = initialState, action: swap.Actions): State {
  switch (action.type) {
    case swap.INITIATE: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case swap.INITIATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
      };
    }
    case swap.INITIATE_FAIL: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const getInititeError = (state: State) => state.error;
export const getInitiateLoading = (state: State) => state.loading;
