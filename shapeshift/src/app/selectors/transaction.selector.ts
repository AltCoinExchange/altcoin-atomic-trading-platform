import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTransaction from '../reducers/transaction.reducer';

export const getTransactionState = createFeatureSelector<fromTransaction.TransactionState>('transaction');

export const getTransactions = createSelector(getTransactionState,
  fromTransaction.getTransactions);
