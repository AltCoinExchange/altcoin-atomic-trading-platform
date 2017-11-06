import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';
import * as fromAudit from './audit.reducer';

export interface AppState {
  start: fromStart.State,
  btcWallet: fromBtcWallet.State,
  swap: fromSwap.State,
  audit: fromAudit.State,
}
