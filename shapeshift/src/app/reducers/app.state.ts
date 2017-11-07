import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromWallets from './wallet.reducer';
import * as fromAudit from './audit.reducer';

export interface AppState {
  start: fromStart.State,
  wallets: fromWallets.State,
  swap: fromSwap.State,
  audit: fromAudit.State,
}
