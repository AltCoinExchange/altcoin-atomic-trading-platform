import {BtcWalletTestNet} from "ts-wallet";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class BtcCoinModel extends BtcWalletTestNet implements Coin {
  readonly type = Coins.BTC;
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = "assets/icon/btc-icon.png";
  readonly iconOutline: string = "assets/icon/btc-icon-o.png";
  readonly fullName: string = "Bitcoin";
  amount: number;

  constructor() {
    super();
  }

  getInitParams(): any {
    throw new Error("Method not implemented.");
  }

  toPersistable() {
    return {
      type: this.type,
      amount: this.amount,
    };
  }

  update(coin: BtcCoinModel): BtcCoinModel {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }

}
