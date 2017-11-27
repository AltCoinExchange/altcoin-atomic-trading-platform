import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromWallets from './wallet.reducer';
import * as fromAudit from './audit.reducer';
import * as fromQuote from './quote.reducer';
import * as fromBalance from './balance.reducer';
import * as fromSideA from './side-a.reducer';


export interface AppState {
  start: fromStart.State;
  wallets: fromWallets.State;
  swap: fromSwap.State;
  audit: fromAudit.State;
  quote: fromQuote.State;
  balance: fromBalance.State;
  sideA: fromSideA.State;
}
