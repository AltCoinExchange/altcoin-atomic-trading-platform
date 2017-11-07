import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromWallets from './wallet.reducer';
import * as fromAudit from './audit.reducer';
import * as fromQuote from './quote.reducer';

export const reducers: ActionReducerMap<AppState> = {
  start: fromStart.reducer,
  wallets: fromWallets.reducer,
  swap: fromSwap.reducer,
  audit: fromAudit.reducer,
  quote: fromQuote.reducer,
};
