import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class RepCoinModel implements Coin {
  readonly type: Coins = Coins.REP;
  readonly name: string = Coins[Coins.REP].toString();
  readonly fullName: string = "Augur";
  readonly icon: string = "assets/icon/rep-icon-o.png";
  amount: number = 0;

  constructor() {
  }

  update(coin: RepCoinModel): RepCoinModel {
    const model = new RepCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
