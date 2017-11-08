import * as btcWallet from '../actions/wallet.action';
import {BtcWalletModel} from '../models/wallets/btc-wallet.model';
import {EthWalletModel} from '../models/wallets/eth-wallet.model';
import * as wallet from 'wallet';

export interface State {
  BTC: BtcWalletModel;
  ETH: EthWalletModel;
}

const xprivKey = localStorage.getItem('xprivkey');
let btc = {} as any;
if (xprivKey) {
  btc = new wallet.Wallet.Bitcoin.BtcWallet(xprivKey, true);
}

const ethPrivKey = localStorage.getItem('ethprivkey');
const ethKeyStore = localStorage.getItem('ethkeystore');
let eth = {} as any;
if (ethPrivKey) {
  eth = new wallet.Wallet.Ethereum.EthWallet(ethPrivKey, true);
}

export const initialState: State = {
  BTC: {
    xprivkey: btc.hdPrivateKey ? btc.hdPrivateKey.xprivkey : '',
    addresses: {},
    derived: {},
  },
  ETH: {
    address: '',
    privateKey: '',
    keystore: {}
  }
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
        ETH: state.ETH
      };
    }
    case btcWallet.SET_ETH_WALLET: {
      return {
        ETH: action.payload,
        BTC: state.BTC
      };
    }
    default: {
      return state;
    }
  }
}

export const getWallets = (state: State) => state;
