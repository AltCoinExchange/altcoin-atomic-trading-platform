import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';
import * as fromAudit from './audit.reducer';

export const reducers: ActionReducerMap<AppState> = {
  start: fromStart.reducer,
  btcWallet: fromBtcWallet.reducer,
  swap: fromSwap.reducer,
  audit: fromAudit.reducer,
};
