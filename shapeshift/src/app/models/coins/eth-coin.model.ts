import {Coin} from './coin.model';
import {Coins} from './coins.enum';

export class EthCoinModel implements Coin {
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  amount: number;

  generateNewAddress(wallet) {
    throw new Error('Method not implemented.');
  }
}
