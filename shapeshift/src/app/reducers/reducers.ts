import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';

export const reducers: ActionReducerMap<AppState> = {
  swap: fromSwap.reducer,
  btcWallet: fromBtcWallet.reducer,
};
