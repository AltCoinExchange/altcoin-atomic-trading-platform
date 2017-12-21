import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {Coins} from "./coins.enum";
import {BtcCoinModel} from "./btc-coin.model";
import {EthCoinModel} from "./eth-coin.model";
import {RepCoinModel} from "./rep-coin.model";
import {DcrCoinModel} from "./dcr-coin.model";
import {AntCoinModel} from "./ant-coin.model";
import {BatCoinModel} from "./bat-coin.model";
import {EosCoinModel} from "./eos-coin.model";
import {GnoCoinModel} from "./gno-coin.model";
import {GntCoinModel} from "./gnt-coin.model";
import {SaltCoinModel} from "./salt-coin.model";
import {LtcCoinModel} from "./ltc-coin.model";
import {CvcCoinModel} from "./cvc-coin.model";
import {DntCoinModel} from "./dnt-coin.model";
import {SntCoinModel} from "./snt-coin.model";
import {SubCoinModel} from "./sub-coin.model";
import {TrxCoinModel} from "./trx-coin.model";
import {OmgCoinModel} from "./omg-coin.model";
import {BtmCoinModel} from "./btm-coin.model";
import {DentCoinModel} from "./dent-coin.model";

export abstract class Coin {
  readonly derive: string;
  readonly type: Coins;
  readonly name: string;
  readonly fullName: string;
  readonly icon: string;
  amount: number;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;
  abstract update(coin: Coin): Coin;

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
      case Coins.REP: {
        return new RepCoinModel();
      }
      default: {
        throw new Error();
      }
    }
  }
  static createAllCoins(): Coin[] {
    return [
      new BtcCoinModel(),
      new EthCoinModel(),
      new RepCoinModel(),
      new DcrCoinModel(),
      new AntCoinModel(),
      new BatCoinModel(),
      new EosCoinModel(),
      new GnoCoinModel(),
      new GntCoinModel(),
      new SaltCoinModel(),
      new LtcCoinModel(),
      new CvcCoinModel(),
      new DntCoinModel(),
      new SntCoinModel(),
      new SubCoinModel(),
      new TrxCoinModel(),
      new OmgCoinModel(),
      new BtmCoinModel(),
      new DentCoinModel()
    ];
  }
}
