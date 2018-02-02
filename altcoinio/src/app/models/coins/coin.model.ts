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
import {PptCoinModel} from "./ppt-coin.model";
import {MkrCoinModel} from "./mkr-coin.model";
import {DgdCoinModel} from "./dgd-coin.model";
import {QashCoinModel} from "./qash-coin.model";
import {EthosCoinModel} from "./ethos-coin.model";
import {FunCoinModel} from "./fun-coin.model";
import {ZrxCoinModel} from "./zrx-coin.model";
import {ReqCoinModel} from "./req-coin.model";
import {BntCoinModel} from "./bnt-coin.model";
import {IcnCoinModel} from "./icn-coin.model";
import {TenxCoinModel} from "./tenx-coin.model";
import {StorjCoinModel} from "./storj-coin.model";
import {EnjCoinModel} from "./enj-coin.model";

export abstract class Coin {
  readonly derive: string;
  readonly type: Coins;
  readonly name: string;
  readonly fullName: string;
  readonly icon: string;
  amount: number;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;
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
      case Coins.BAT: {
        return new BatCoinModel();
      }
      case Coins.ANT: {
        return new AntCoinModel();
      }
      case Coins.BTM: {
        return new BtmCoinModel();
      }
      case Coins.CVC: {
        return new CvcCoinModel();
      }
      case Coins.DCR: {
        return new DcrCoinModel();
      }
      case Coins.DENT: {
        return new DentCoinModel();
      }
      case Coins.DNT: {
        return new DntCoinModel();
      }
      case Coins.EOS: {
        return new EosCoinModel();
      }
      case Coins.GNO: {
        return new GnoCoinModel();
      }
      case Coins.GNT: {
        return new GntCoinModel();
      }
      case Coins.LTC: {
        return new LtcCoinModel();
      }
      case Coins.OMG: {
        return new OmgCoinModel();
      }
      case Coins.SALT: {
        return new SaltCoinModel();
      }
      case Coins.SUB: {
        return new SubCoinModel();
      }
      case Coins.TRX: {
        return new TrxCoinModel();
      }
      default: {
        throw new Error();
      }
    }
  }
  static createCoinFromString(coin: string) {
    return this.createCoin(Coins[coin]);
  }
  static createAllCoins(): Coin[] {
    return [
      new BtcCoinModel(),
      new EthCoinModel(),
      new RepCoinModel(),
      // new DcrCoinModel(),
      new AntCoinModel(),
      new BatCoinModel(),
      new EosCoinModel(),
      //new GnoCoinModel(),
      //new GntCoinModel(),
      new SaltCoinModel(),
      // new LtcCoinModel(),
      new CvcCoinModel(),
      new DntCoinModel(),
      new SntCoinModel(),
      new SubCoinModel(),
      new TrxCoinModel(),
      new OmgCoinModel(),
      new BtmCoinModel(),
      new DentCoinModel(),
      new PptCoinModel(),
      new MkrCoinModel(),
      new DgdCoinModel(),
      new QashCoinModel(),
      new EthosCoinModel(),
      new FunCoinModel(),
      new ZrxCoinModel(),
      new ReqCoinModel(),
      new BntCoinModel(),
      new IcnCoinModel(),
      new TenxCoinModel(),
      new StorjCoinModel(),
      new EnjCoinModel()
    ];
  }
}
