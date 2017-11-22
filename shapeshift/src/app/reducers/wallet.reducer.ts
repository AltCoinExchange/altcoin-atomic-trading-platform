import * as walletAction from '../actions/wallet.action';
import {BtcWalletModel} from '../models/wallets/btc-wallet.model';
import {EthWalletModel} from '../models/wallets/eth-wallet.model';
import {BtcWallet} from '../../../../wallet/src/wallet-btc';
import {EthWallet} from '../../../../wallet/src/wallet-eth';
import {ShapeshiftStorage} from '../common/shapeshift-storage';

export interface State {
  BTC: BtcWalletModel;
  ETH: EthWalletModel;
}
//
// const xprivKey = ShapeshiftStorage.get('xprivkey');
// let btc = {} as any;
// if (xprivKey) {
//   btc = new BtcWallet(xprivKey, true);
// }
//
// const ethPrivKey = ShapeshiftStorage.get('ethprivkey');
// const ethKeyStore = ShapeshiftStorage.get('ethkeystore');
// let eth = {} as any;
// let ethLogin = {} as any;
// if (ethPrivKey && ethKeyStore) {
//   eth = new EthWallet();
//   ethLogin = eth.atomicSwap.Login(JSON.parse(ethKeyStore), ethPrivKey);
// }


export const initialState: State = {
  BTC: new BtcWalletModel(ShapeshiftStorage.get('xprivkey')),
  ETH: new EthWalletModel(ShapeshiftStorage.get('ethprivkey'), ShapeshiftStorage.get('ethkeystore'))
};

export function reducer(state = initialState, action: walletAction.Actions) {
  switch (action.type) {
    case walletAction.SET_BTC_WALLET: {
      if (state.BTC.privateKey()) {

        console.log(state);
        return state;
      }
      ShapeshiftStorage.set('xprivkey', action.payload.xprivkey);
      ShapeshiftStorage.set('btc-wif', action.payload.wif);
      return {
        ...state,
        BTC: action.payload,
      };
    }
    case walletAction.SET_ETH_WALLET: {
      if (state.ETH.privateKey()) {
        console.log(state);
        return state;
      }
      ShapeshiftStorage.set('ethprivkey', action.payload.xprivKey);
      ShapeshiftStorage.set('ethkeystore', JSON.stringify(action.payload.keystore));
      return {
        ...state,
        ETH: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getWallets = (state: State) => state;
