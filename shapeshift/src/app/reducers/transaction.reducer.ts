import * as transaction from "../actions/transaction.action";
import {TransactionModel} from "../models/transaction.model";

export interface State {
  transactions: TransactionModel,
}

export const initialState: State = {
  transactions: undefined,
};

export function reducer(state = initialState, action: transaction.Actions): State {
  switch (action.type) {
    case transaction.LOAD_TRANSACTION: {
      return state;
    }
    case transaction.LOAD_TRANSACTION_SUCCESS: {
      return {
        ...state,
        transactions: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getTransactions = (state: State): TransactionModel => state.transactions;
