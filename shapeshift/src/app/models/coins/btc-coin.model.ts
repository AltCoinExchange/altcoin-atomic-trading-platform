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

  update(coin: Coin): Coin {
    const key = ShapeshiftStorage.get('btc-wif');
    const model = new BtcCoinModel();
    model.initialize(key);
    model.amount = coin.amount;
    return model;
  }

  generateNewAddress(key?: string) {
    if (!key) {
      key = ShapeshiftStorage.get('btc-wif');
    }
    return super.generateNewAddress(key);
  }

  redeem(data, key?: string) {
    if (!key) {
      key = ShapeshiftStorage.get('btc-wif');
    }
    return super.redeem(data, key);
  }

  initiate(address: string, amount: number, key: string) {
    if (!key) {
      key = ShapeshiftStorage.get('btc-wif');
    }
    return super.initiate(address, amount, key);
  }
}
