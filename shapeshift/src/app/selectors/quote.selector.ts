import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromQuote from '../reducers/quote.reducer';

export const getQuoteState = createFeatureSelector<fromQuote.State>('quote');

export const getQuotes = createSelector(getQuoteState,
  fromQuote.getQuotes);
