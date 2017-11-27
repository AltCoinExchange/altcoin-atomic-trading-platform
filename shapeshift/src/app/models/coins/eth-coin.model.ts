import {EthWalletTestnet} from "ts-wallet";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

export class EthCoinModel extends EthWalletTestnet implements Coin {
  readonly type: Coins = Coins.ETH;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = "assets/icon/eth-icon.png";
  readonly iconOutline: string = "assets/icon/eth-icon-o.png";
  readonly fullName: string = "Ethereum";
  amount: number;

  constructor() {
    super();
  }
}
