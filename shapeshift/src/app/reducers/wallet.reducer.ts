import * as btcWallet from '../actions/wallet.action';
import {BtcWalletModel} from '../models/wallets/btc-wallet.model';
import * as wallet from 'wallet';

export interface State {
  BTC: BtcWalletModel;
}

const xprivKey = localStorage.getItem('xprivkey');
let btc = {} as any;
if (xprivKey) {
  btc = new wallet.Wallet.Bitcoin.BtcWallet(xprivKey, true);
}

export const initialState: State = {
  BTC: {
    xprivkey: btc.hdPrivateKey ? btc.hdPrivateKey.xprivkey : '',
    addresses: {},
    derived: {},
  },
};

export function reducer(state = initialState, action: btcWallet.Actions) {
  switch (action.type) {
    case btcWallet.SET_BTC_WALLET: {
      if (state.BTC.xprivkey) {

        console.log(state);
        return state;
      }
      localStorage.setItem('xprivkey', action.payload.xprivkey);
      return {
        BTC: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getWallets = (state: State) => state;
