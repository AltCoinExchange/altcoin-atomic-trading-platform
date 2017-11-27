import * as sideA from "../actions/side-A.action";

export interface State {
  link: string;
}

export const initialState: State = {
  link: undefined,
};

export function reducer(state = initialState, action: sideA.Actions): State {
  switch (action.type) {

    case sideA.GENERATE_LINK_SUCCESS: {
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
export const getLink = (state: State) => state.link;
