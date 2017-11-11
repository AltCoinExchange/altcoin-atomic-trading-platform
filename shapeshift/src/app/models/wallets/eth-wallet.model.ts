import {WalletModel} from './wallet.model';

export interface EthWalletModel extends WalletModel {
  privateKey: string;
  keystore: {}
}
