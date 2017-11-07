import {WalletModel} from '../wallets/wallet.model';

export abstract class Coin {
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  amount: number;

  abstract generateNewAddress(wallet: WalletModel);
}
