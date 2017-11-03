import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSwap from '../reducers/swap.reducer';

export const getSwapState = createFeatureSelector<fromSwap.State>('swap');

export const getSwapProcess = createSelector(getSwapState,
  fromSwap.getSwapProcess);

export const getDepositCoin = createSelector(getSwapState,
  fromSwap.getDepositCoin);

export const getReceiveCoin = createSelector(getSwapState,
  fromSwap.getReceiveCoin);
