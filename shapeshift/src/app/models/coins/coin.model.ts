import {Observable} from "rxjs/Observable";
import {InitiateData, InitiateParams} from "ts-wallet";
import {BtcCoinModel} from "./btc-coin.model";
import {Coins} from "./coins.enum";
import {EthCoinModel} from "./eth-coin.model";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

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
        const ethCoinModel = new EthCoinModel();
        const xprivKey = ShapeshiftStorage.get("btcprivkey");
        const keystore = ethCoinModel.recover(xprivKey);
        ethCoinModel.login(keystore, xprivKey);
        return ethCoinModel;
      }
      default: {
        throw new Error();
      }
    }
  }
}
