import * as swap from '../actions/swap.action';

export interface State {
  error: string;
  loading: boolean;
  initiateData: any;
  link: string;
}

export const initialState: State = {
  error: undefined,
  loading: false,
  initiateData: undefined,
  link: undefined,
};

export function reducer(state = initialState, action: swap.Actions): State {
  switch (action.type) {
    case swap.INITIATE: {
      return {
        ...state,
        error: null,
        loading: true,
        link: action.payload.link,
      };
    }
    case swap.INITIATE_SUCCESS: {
      localStorage.setItem(state.link, JSON.stringify(action.payload));
      return {
        ...state,
        error: null,
        loading: false,
        initiateData: action.payload,
      };
    }
    case swap.INITIATE_FAIL: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    }
    case swap.LOAD_LOCAL_INITIATE_DATA: {
      const link = action.payload;
      const data: string = localStorage.getItem(link);
      return {
        ...state,
        initiateData: JSON.parse(data),
      };
    }
    default: {
      return state;
    }
  }
}

export const getInititeError = (state: State) => state.error;
export const getInitiateLoading = (state: State) => state.loading;
export const getInitiateData = (state: State) => state.initiateData;
