import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import {BtcWalletModel} from '../wallets/btc-wallet.model';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';

export class BtcCoinModel extends BtcWalletModel implements Coin {
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = 'assets/icon/btc-icon.png';
  readonly iconOutline: string = 'assets/icon/btc-icon-o.png';
  readonly fullName: string = 'Bitcoin';
  amount: number;

  constructor(key?: string, codes?: string[]) {
    super(key, codes);
  }

  update(coin: Coin): Coin {
    const key = ShapeshiftStorage.get('xprivkey');
    const model = new BtcCoinModel(key);
    model.amount = coin.amount;
    return model;
  }
}
