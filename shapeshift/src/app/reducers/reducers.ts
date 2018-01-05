import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromWallets from './wallet.reducer';
import * as fromAudit from './audit.reducer';
import * as fromQuote from './quote.reducer';
import * as fromBalance from './balance.reducer';
import * as fromSideA from './side-a.reducer';
import * as fromSideB from './side-b.reducer';

export const reducers: ActionReducerMap<AppState> = {
  start: fromStart.reducer,
  wallets: fromWallets.reducer,
  swap: fromSwap.reducer,
  audit: fromAudit.reducer,
  quote: fromQuote.reducer,
  balance: fromBalance.reducer,
  sideA: fromSideA.reducer,
  sideB: fromSideB.reducer,
};
