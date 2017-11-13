///<reference path="btc-coin.model.ts"/>
import {WalletModel} from '../wallets/wallet.model';
import {Coins} from './coins.enum';
import {BtcCoinModel} from './btc-coin.model';
import {EthCoinModel} from './eth-coin.model';

export abstract class Coin {
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  amount: number;

  abstract generateNewAddress(wallet: WalletModel);
  abstract update(coin: Coin): Coin;
  abstract initiate(address: string): any;
  abstract participate(address: string, secretHash: string): any;
  abstract redeem(secret: string, secretHash: string);
  abstract redeem(secret: string, contract: string, contractTx: string): any;
  abstract refund(hashedSecret: string);
  abstract refund(contract: string, contractTx: string): any;
  abstract extractSecret(hashedSecret: string): any;
  abstract getBalance(address: string): any;
}

export class CoinFactory {
  static createCoin(coin: Coins): Coin {
    switch (coin) {
      case Coins.BTC: {
        return new BtcCoinModel();
      }
      case Coins.ETH: {
        return new EthCoinModel();
      }
      default: {
        throw new Error();
      }
    }
  }
}
