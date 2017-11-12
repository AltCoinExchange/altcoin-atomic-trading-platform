import {WalletModel} from './wallet.model';

export interface BtcWalletModel extends WalletModel{
  addresses: {},
  wif: string;
  derived: {},
  xprivkey: string,
}
