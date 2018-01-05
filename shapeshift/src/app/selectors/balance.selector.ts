import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createFeatureSelector<fromBalance.State>('balance');

export const getETHBalance = createSelector(getBalanceState,
  fromBalance.getETHBalance);

export const getREPBalance = createSelector(getBalanceState,
  fromBalance.getREPBalance);

export const getBTCBalance = createSelector(getBalanceState,
  fromBalance.getBTCBalance);

export const getBtcLoading = createSelector(getBalanceState,
  fromBalance.getBtcLoading);

export const getEthLoading = createSelector(getBalanceState,
  fromBalance.getEthLoading);

export const getRepLoading = createSelector(getBalanceState,
  fromBalance.getRepLoading);

export const getTokenBalances = createSelector(getBalanceState, fromBalance.getTokenBalances);
export const getTokenBalanceAugur = createSelector(getBalanceState, fromBalance.getTokenBalanceAugur);
export const getTokenBalanceGolem = createSelector(getBalanceState, fromBalance.getTokenBalanceGolem);
export const getTokenBalanceGnosis = createSelector(getBalanceState, fromBalance.getTokenBalanceGnosis);
export const getTokenBalanceBat = createSelector(getBalanceState, fromBalance.getTokenBalanceBat);
export const getTokenBalanceAragon = createSelector(getBalanceState, fromBalance.getTokenBalanceAragon);
export const getTokenBalanceEos = createSelector(getBalanceState, fromBalance.getTokenBalanceEos);
export const getTokenBalanceSalt = createSelector(getBalanceState, fromBalance.getTokenBalanceSalt);

export const getTokenBalanceCivic = createSelector(getBalanceState, fromBalance.getTokenBalanceCivic);
export const getTokenBalanceOmiseGo = createSelector(getBalanceState, fromBalance.getTokenBalanceOmiseGo);
export const getTokenBalanceDistrict0x = createSelector(getBalanceState, fromBalance.getTokenBalanceDistrict0x);
export const getTokenBalanceStatusNetwork = createSelector(getBalanceState, fromBalance.getTokenBalanceStatusNetwork);
export const getTokenBalanceSubstratum = createSelector(getBalanceState, fromBalance.getTokenBalanceSubstratum);
export const getTokenBalanceTron = createSelector(getBalanceState, fromBalance.getTokenBalanceTron);
export const getTokenBalanceBytom = createSelector(getBalanceState, fromBalance.getTokenBalanceBytom);
export const getTokenBalanceDent = createSelector(getBalanceState, fromBalance.getTokenBalanceDent);

export const getTokenLoadingAugur = createSelector(getBalanceState, fromBalance.getTokenLoadingAugur);
export const getTokenLoadingGolem = createSelector(getBalanceState, fromBalance.getTokenLoadingGolem);
export const getTokenLoadingGnosis = createSelector(getBalanceState, fromBalance.getTokenLoadingGnosis);
export const getTokenLoadingBat = createSelector(getBalanceState, fromBalance.getTokenLoadingBat);
export const getTokenLoadingAragon = createSelector(getBalanceState, fromBalance.getTokenLoadingAragon);
export const getTokenLoadingEos = createSelector(getBalanceState, fromBalance.getTokenLoadingEos);
export const getTokenLoadingSalt = createSelector(getBalanceState, fromBalance.getTokenLoadingSalt);
