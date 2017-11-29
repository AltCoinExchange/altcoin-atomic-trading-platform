import {Observable} from "rxjs/Observable";
import {EthInitiateData, EthInitiateParams, EthWalletTestnet, InitiateData, ParticipateData} from "ts-wallet";
import {EthParticipateParams} from "../../../../../wallet-ts/src/eth/atomic-swap/eth-participate-params";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

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

  Participate(data: InitiateData): Observable<ParticipateData> {
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    const keystore = this.recover(xprivKey);
    this.login(keystore, xprivKey);

    const secretHash = data.secretHash;
    const participateParams = new EthParticipateParams();
    participateParams.secretHash = secretHash.indexOf("0x") === -1 ? "0x" + secretHash : secretHash;
    participateParams.address = "0x" + data.address;
    participateParams.refundTime = this.timeout;
    participateParams.amount = this.amount.toString();
    console.log('participateParams', participateParams);
    return Observable.from(super.participate(participateParams));
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
