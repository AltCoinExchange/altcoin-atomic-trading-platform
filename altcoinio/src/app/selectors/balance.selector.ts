import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createFeatureSelector<fromBalance.State>('balance');

export const getETHBalance = createSelector(getBalanceState,
  fromBalance.getETHBalance);

export const getBTCBalance = createSelector(getBalanceState,
  fromBalance.getBTCBalance);


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
