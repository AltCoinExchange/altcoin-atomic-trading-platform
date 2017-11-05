import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBtc from '../reducers/btc-wallet.reducer';

export const getBtcWalletState = createFeatureSelector<fromBtc.State>('btcWallet');

export const getBtcWallet = createSelector(getBtcWalletState,
  fromBtc.getBtcWallet);

