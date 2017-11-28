import {EthInitiateParams, EthWalletTestnet} from "ts-wallet";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {EthInitiateData} from "ts-wallet";
import {Observable} from "rxjs/Observable";

export class EthCoinModel extends EthWalletTestnet implements Coin {
  readonly timeout: number = 7200;
  readonly type: Coins = Coins.ETH;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = "assets/icon/eth-icon.png";
  readonly iconOutline: string = "assets/icon/eth-icon-o.png";
  readonly fullName: string = "Ethereum";
  amount: number;

  constructor() {
    super();
  }


  Initiate(address): Observable<EthInitiateData> {
    return Observable.fromPromise(super.initiate(this.getInitParams(address)));
  }

  getInitParams(address: string): EthInitiateParams {
    return new EthInitiateParams(this.timeout, address, this.amount.toString());
  }

  toPersistable() {
    return {
      type: this.type,
      amount: this.amount,
    };
  }

  update(coin: EthCoinModel): EthCoinModel {
    const model = new EthCoinModel();
    model.amount = coin.amount;
    return model;
  }

}
