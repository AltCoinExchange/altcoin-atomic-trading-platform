import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromSideB from "../reducers/side-b.reducer";

export const getSideBState = createFeatureSelector<fromSideB.State>("sideB");

export const getBLink = createSelector(getSideBState,
  fromSideB.getBLink);
export const getBProgress = createSelector(getSideBState,
  fromSideB.getBProgress);
export const getBLoading = createSelector(getSideBState,
  fromSideB.getBLoading);
export const getBReceiveCoin = createSelector(getSideBState,
  fromSideB.getBReceiveCoin);
export const getBDepositCoin = createSelector(getSideBState,
  fromSideB.getBDepositCoin);
export const getBSecret = createSelector(getSideBState,
  fromSideB.getBSecret);
export const getBHashedSecret = createSelector(getSideBState,
  fromSideB.getBHashedSecret);
export const getBContractBin = createSelector(getSideBState,
  fromSideB.getBContractBin);
export const getBContractTx = createSelector(getSideBState,
  fromSideB.getBContractTx);
