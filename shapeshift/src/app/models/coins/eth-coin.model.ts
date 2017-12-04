import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class EthCoinModel implements Coin {
  readonly type: Coins = Coins.ETH;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = "assets/icon/eth-icon.png";
  readonly iconOutline: string = "assets/icon/eth-icon-o.png";
  readonly fullName: string = "Ethereum";
  amount: number;

  constructor() {
  }

  update(coin: EthCoinModel): EthCoinModel {
    const model = new EthCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
