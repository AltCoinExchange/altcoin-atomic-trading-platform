import * as sideB from "../actions/side-B.action";

export interface State {
  link: string;
}

export const initialState: State = {
  link: undefined,
};

export function reducer(state = initialState, action: sideB.Actions): State {
  switch (action.type) {

    case sideB.INITIATE: {
      return {
        ...state,
        link: action.payload.link,
      };
    }

    default: {
      return state;
    }

  }
}
export const getLink = (state: State) => state.link;
