import {Coin} from './coin.model';
import {Coins} from './coins.enum';

export class EthCoinModel implements Coin {
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  readonly fullName: string = 'Ethereum';
  amount: number;

  update(coin: Coin): Coin {
    const model = new EthCoinModel();
    model.amount = coin.amount;
    return model;
  }
}
