import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBtc from '../reducers/wallet.reducer';

export const getWalletState = createFeatureSelector<fromBtc.State>('wallets');

