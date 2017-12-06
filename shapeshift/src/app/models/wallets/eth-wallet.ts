import {
  EthInitiateParams,
  EthParticipateParams,
  EthWalletTestnet,
  InitiateData,
  ParticipateData,
} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {RedeemData, RedeemParams} from "../../../../../wallet/src/atomic-swap";
import {EthRedeemParams} from "../../../../../wallet/src/eth/atomic-swap/eth-redeem-params";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {EthCoinModel} from "../coins/eth-coin.model";
import {Wallet} from "./wallet";

export class EthWallet extends EthWalletTestnet implements Wallet {
  readonly timeout: number = 7200;

  constructor() {
    super();
  }

  Initiate(address: string, coin: EthCoinModel): Observable<InitiateData> {
    return Observable.fromPromise(super.initiate(this.getInitParams(address, coin.amount.toString())));
  }

  Participate(data: InitiateData, coin: EthCoinModel): Observable<ParticipateData> {
    // tslint:disable-next-line
    console.log("PARTICIPATING ETH:... ", InitiateData);
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    const keystore = super.recover(xprivKey);
    this.login(keystore, xprivKey);

    const secretHash = data.secretHash;
    const participateParams = new EthParticipateParams(this.timeout,
      secretHash.indexOf("0x") === -1 ? "0x" + secretHash : secretHash,
      data.address,
      coin.amount.toString(), xprivKey);

    return Observable.fromPromise(super.participate(participateParams));
  }

  Redeem(data: RedeemData, coin: EthCoinModel): Observable<RedeemData> {
    const params = new EthRedeemParams(data.secret, data.secretHash, null);
    return Observable.fromPromise(super.redeem(params));
  }

  getInitParams(address: string, amount: string): EthInitiateParams {
    return new EthInitiateParams(this.timeout, address, amount.toString());
  }
}
