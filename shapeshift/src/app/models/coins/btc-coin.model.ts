import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class BtcCoinModel implements Coin {
  readonly type = Coins.BTC;
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = "assets/icon/btc-icon.png";
  iconOutline: string = "assets/icon/btc-icon-o.png";
  readonly fullName: string = "Bitcoin";
  amount: number;

  constructor() {
  }

  update(coin: BtcCoinModel): BtcCoinModel {
    const model = new BtcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
