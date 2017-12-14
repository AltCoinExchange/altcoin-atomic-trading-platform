import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createFeatureSelector<fromBalance.State>('balance');

export const getETHBalance = createSelector(getBalanceState,
  fromBalance.getETHBalance);

export const getREPBalance = createSelector(getBalanceState,
  fromBalance.getREPBalance);

export const getBTCBalance = createSelector(getBalanceState,
  fromBalance.getBTCBalance);

export const getTokenBalanceAugur = createSelector(getBalanceState,
  fromBalance.getTokenBalanceAugur);

export const getTokenBalanceGolem = createSelector(getBalanceState,
  fromBalance.getTokenBalanceGolem);

export const getBtcLoading = createSelector(getBalanceState,
  fromBalance.getBtcLoading);

export const getEthLoading = createSelector(getBalanceState,
  fromBalance.getEthLoading);

export const getRepLoading = createSelector(getBalanceState,
  fromBalance.getRepLoading);

export const getTokenLoadingAugur = createSelector(getBalanceState,
  fromBalance.getTokenLoadingAugur);

export const getTokenLoadingGolem = createSelector(getBalanceState,
  fromBalance.getTokenLoadingGolem);
