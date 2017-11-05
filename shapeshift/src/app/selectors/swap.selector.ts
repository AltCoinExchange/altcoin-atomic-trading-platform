import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSwap from '../reducers/swap.reducer';

export const getSwapState = createFeatureSelector<fromSwap.State>('swap');

export const getInitiateError = createSelector(getSwapState,
  fromSwap.getInititeError);

export const getInitiateLoading = createSelector(getSwapState,
  fromSwap.getInitiateLoading);
