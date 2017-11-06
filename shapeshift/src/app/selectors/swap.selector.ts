import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSwap from '../reducers/swap.reducer';
import * as fromAudit from '../reducers/audit.reducer';

export const getSwapState = createFeatureSelector<fromSwap.State>('swap');

export const getInitiateError = createSelector(getSwapState,
  fromSwap.getInititeError);

export const getInitiateLoading = createSelector(getSwapState,
  fromSwap.getInitiateLoading);

export const getInitiateData = createSelector(getSwapState,
  fromSwap.getInitiateData);


export const getAuditState = createFeatureSelector<fromAudit.State>('audit');

export const getAuditData = createSelector(getAuditState
  , fromAudit.getAuditData);

export const getAuditLoading = createSelector(getAuditState
  , fromAudit.getAuditLoading);
