import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import {EthWalletModel} from '../wallets/eth-wallet.model';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';

export class EthCoinModel extends EthWalletModel implements Coin {
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  readonly fullName: string = 'Ethereum';
  amount: number;

  update(coin: Coin): Coin {
    const xprivKey = ShapeshiftStorage.get('xprivkey');
    const model = new EthCoinModel(xprivKey);
    model.initialize();
    model.amount = coin.amount;
    return model;
  }
}
