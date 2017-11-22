import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import {EthWalletModel} from '../wallets/eth-wallet.model';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';

class KeyStore {
  key: string;
  storage: any;
}

export class EthCoinModel extends EthWalletModel implements Coin {
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  readonly fullName: string = 'Ethereum';
  amount: number;

  constructor(key?: string, keystore?: any) {
    super(key, keystore);
  }

  /**
   * Get key store
   * @returns {KeyStore}
   */
  private getKeyStore(key?: string, storage?: any): KeyStore {
    const ks = new KeyStore();
    if (!key) {
      ks.key = ShapeshiftStorage.get('ethprivkey');
      ks.storage = JSON.parse(ShapeshiftStorage.get('ethkeystore'));
    } else {
      ks.key = key;
      ks.storage = storage;
    }
    return ks;
  }

  update(coin: Coin): Coin {
    const store = this.getKeyStore();
    const model = new EthCoinModel(store.key, store.storage);
    model.amount = coin.amount;
    return model;
  }
}
