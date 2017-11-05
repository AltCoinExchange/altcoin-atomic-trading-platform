import * as fromStart from './start.reducer';
import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';

export interface AppState {
  start: fromStart.State,
  btcWallet: fromBtcWallet.State,
  swap: fromSwap.State,
}
