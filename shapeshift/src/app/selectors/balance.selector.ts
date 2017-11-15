import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createFeatureSelector<fromBalance.State>('balance');

export const getETHBalance = createSelector(getBalanceState,
  fromBalance.getETHBalance);

export const getBalanceLoading = createSelector(getBalanceState,
  fromBalance.getLoading);
