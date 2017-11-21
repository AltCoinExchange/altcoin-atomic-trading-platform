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
    const xprivKey = this.getKeyStore().key;
    const model = new EthCoinModel(xprivKey);
    model.initialize();
    model.amount = coin.amount;
    return model;
  }
  //
  // generateNewAddress(key?: string, storage?: any) {
  //   const ks = this.getKeyStore(key, storage);
  //   return super.generateNewAddress(ks.key, ks.storage);
  // }
  //
  // redeem(data, key?: string) {
  //   if (!key) {
  //     key = ShapeshiftStorage.get('btc-wif');
  //   }
  //   return super.redeem(data, key);
  // }
  //
  // initiate(address: string, amount: number, key: string) {
  //   if (!key) {
  //     key = ShapeshiftStorage.get('btc-wif');
  //   }
  //   return super.initiate(address, amount, key);
  // }
}
