import * as fromSwap from './swap.reducer';
import * as fromBtcWallet from './btc-wallet.reducer';

export interface AppState {
  swap: fromSwap.State,
  btcWallet: fromBtcWallet.State,
}
