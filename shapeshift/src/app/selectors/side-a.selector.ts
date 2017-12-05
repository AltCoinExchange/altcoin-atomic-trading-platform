import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromSideA from "../reducers/side-a.reducer";

export const getSideAState = createFeatureSelector<fromSideA.State>("sideA");

export const getALink = createSelector(getSideAState,
  fromSideA.getALink);

export const getAStatus = createSelector(getSideAState,
  fromSideA.getAStatus);

export const getALoading = createSelector(getSideAState,
  fromSideA.getALoading);
export const getAReceiveCoin = createSelector(getSideAState,
  fromSideA.getAReceiveCoin);
export const getADepositCoin = createSelector(getSideAState,
  fromSideA.getADepositCoin);
