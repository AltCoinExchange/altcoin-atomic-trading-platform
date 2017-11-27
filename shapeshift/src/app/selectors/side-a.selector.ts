import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromSideA from "../reducers/side-a.reducer";

export const getSideAState = createFeatureSelector<fromSideA.State>("sideA");

export const getLink = createSelector(getSideAState,
  fromSideA.getLink);
