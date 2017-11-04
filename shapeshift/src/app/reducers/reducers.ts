import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';

export const reducers: ActionReducerMap<AppState> = {
  start: fromStart.reducer,
  btcWallet: fromBtcWallet.reducer,
  swap: fromSwap.reducer,
};
