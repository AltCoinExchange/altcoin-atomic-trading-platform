import * as quote from "../actions/quote.action";
import {Quote} from "../models/quote.model";

export interface State {
  quotes: Map<string, Quote>,
}

export const initialState: State = {
  quotes: undefined,
};

export function reducer(state = initialState, action: quote.Actions): State {
  switch (action.type) {
    case quote.LOAD_QUOTE: {
      return state;
    }
    case quote.LOAD_QUOTE_SUCCESS: {
      const quotesMap = new Map();
      (<any>action.payload).forEach(quote => {
        quotesMap.set(quote.short, quote);
      });
      return {
        ...state,
        quotes: quotesMap,
      };
    }
    default: {
      return state;
    }
  }
}

export const getQuotes = (state: State): Map<string, Quote> => state.quotes;
