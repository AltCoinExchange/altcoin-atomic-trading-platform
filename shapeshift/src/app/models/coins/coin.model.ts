import {Coins} from "./coins.enum";
import {BtcCoinModel} from "./btc-coin.model";
import {EthCoinModel} from "./eth-coin.model";
import {InitiateParams} from "ts-wallet";
import {InitiateData} from "ts-wallet";
import {Observable} from "rxjs/Observable";

export abstract class Coin {
  readonly type: Coins;
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  readonly fullName: string;
  amount: number;

  abstract update(coin: Coin): Coin;

  abstract toPersistable();

  abstract getInitParams(address: string): InitiateParams;

  abstract Initiate(address: string): Observable<InitiateData>;
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
