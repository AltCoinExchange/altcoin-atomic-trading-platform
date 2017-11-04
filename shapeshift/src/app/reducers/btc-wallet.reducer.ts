import * as btcWallet from '../actions/btc-wallet.action';
import {BtcWalletModel} from '../models/btc-wallet.model';
import * as wallet from 'wallet';

export interface State {
  btcWallet: BtcWalletModel;
}

const xprivKey = localStorage.getItem('xprivkey');
let btc = {} as any;
if (xprivKey) {
  btc = new wallet.Wallet.Bitcoin.BtcWallet(xprivKey, true);
}

export const initialState: State = {
  btcWallet: {
    xprivkey: btc.hdPrivateKey ? btc.hdPrivateKey.xprivkey : '',
    addresses: {},
    derived: {},
  },
};

export function reducer(state = initialState, action: btcWallet.Actions) {
  switch (action.type) {
    case btcWallet.SET_BTC_WALLET: {
      if (state.btcWallet.xprivkey) {
        console.log('I have it already');
        return state;
      }
      localStorage.setItem('xprivkey', action.payload.xprivkey);
      return {
        btcWallet: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getBtcWallet = (state: State) => state.btcWallet;
