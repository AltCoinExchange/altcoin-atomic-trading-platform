import {WalletModel} from './wallet.model';

export interface EthWalletModel extends WalletModel {
  address: '';
  privateKey: '';
  keystore: {};
}
