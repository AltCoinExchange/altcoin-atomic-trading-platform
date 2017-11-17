import {WalletModel} from './wallet.model';

export interface DcrWalletModel extends WalletModel {
  privateKey: string;
}
