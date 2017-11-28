import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromSideB from "../reducers/side-b.reducer";

export const getSideBState = createFeatureSelector<fromSideB.State>("sideB");

export const getBLink = createSelector(getSideBState,
  fromSideB.getBLink);
export const getBStatus = createSelector(getSideBState,
  fromSideB.getBStatus);
export const getBLoading = createSelector(getSideBState,
  fromSideB.getBLoading);
