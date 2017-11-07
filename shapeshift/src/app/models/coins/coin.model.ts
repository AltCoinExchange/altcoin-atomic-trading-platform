import {WalletModel} from '../wallets/wallet.model';

export interface Coin {
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  amount: number;

  generateNewAddress(wallet: WalletModel);
}
