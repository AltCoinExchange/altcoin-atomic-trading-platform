import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromStart from '../reducers/start.reducer';

export const getStartState = createFeatureSelector<fromStart.State>('start');

export const getSwapProcess = createSelector(getStartState,
  fromStart.getSwapProcess);

export const getDepositCoin = createSelector(getStartState,
  fromStart.getDepositCoin);

export const getReceiveCoin = createSelector(getStartState,
  fromStart.getReceiveCoin);

export const getLink = createSelector(getStartState,
  fromStart.getLink);

  export const getActiveStep = createSelector(getStartState,
    fromStart.getActiveStep);