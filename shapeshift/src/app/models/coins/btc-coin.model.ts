import {Coin} from './coin.model';
import {Coins} from './coins.enum';

export class BtcCoinModel implements Coin {
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = 'assets/icon/btc-icon.png';
  readonly iconOutline: string = 'assets/icon/btc-icon-o.png';
  readonly fullName: string = 'Bitcoin';
  amount: number;

  update(coin: Coin): Coin {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }
}
