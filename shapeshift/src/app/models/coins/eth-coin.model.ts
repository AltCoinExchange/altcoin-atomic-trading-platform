import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class EthCoinModel implements Coin {
  readonly type: Coins = Coins.ETH;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly fullName: string = "Ethereum";
  readonly icon: string = "assets/icon/eth-icon-o.png";
  amount: number = 0;

  constructor() {
  }

  update(coin: EthCoinModel): EthCoinModel {
    const model = new EthCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
