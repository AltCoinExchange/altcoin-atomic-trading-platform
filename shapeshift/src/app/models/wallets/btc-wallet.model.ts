import {WalletModel} from './wallet.model';

export interface BtcWalletModel extends WalletModel{
  addresses: {},
  derived: {},
  xprivkey: string,
}
