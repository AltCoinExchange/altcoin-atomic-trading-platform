import * as audit from '../actions/swap-audit.action';

export interface State {
  data: any,
  loading: boolean,
}

export const initialState: State = {
  data: undefined,
  loading: false,
};

export function reducer(state = initialState, action: audit.Actions): State {
  switch (action.type) {

    case audit.SWAP_AUDIT: {
      return {
        ...state,
        loading: true,
      };
    }

    case audit.SWAP_AUDIT_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }

  }
}

export const getAuditData = (state: State) => state.data;
export const getAuditLoading = (state: State) => state.loading;
