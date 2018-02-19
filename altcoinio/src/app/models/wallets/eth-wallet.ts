import {
  EthereumWallet,
  EthInitiateParams,
  EthParticipateParams,
  EthRedeemParams,
  InitiateData,
  ParticipateData,
  RedeemData,
  TokenAtomicSwap,
  TokenFactory,
  TOKENS
} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {EthCoinModel} from "../coins/eth-coin.model";
import {Wallet} from "./wallet";

export class EthWallet extends EthereumWallet implements Wallet {
  readonly timeout: number = 7200;

  constructor() {
    super();
  }

  Initiate(address: string, coin: EthCoinModel): Observable<InitiateData> {
    console.log("INITIATING ETH:... ", InitiateData);
    return Observable.fromPromise(super.initiate(this.getInitParams(address, coin.amount.toString())));
  }

  Participate(data: InitiateData, coin: EthCoinModel): Observable<ParticipateData> {
    // tslint:disable-next-line
    console.log("PARTICIPATING ETH:... ", InitiateData);
    const xprivKey = this.init();

    const secretHash = data.secretHash;
    const participateParams = new EthParticipateParams(this.timeout,
      this.oxify(secretHash),
      data.address,
      coin.amount.toString(), xprivKey);

    return Observable.fromPromise(super.participate(participateParams));
  }

  Redeem(data: RedeemData, coin: EthCoinModel): Observable<RedeemData> {
    console.log("REDEEMING ETH:... ", InitiateData);
    this.init();
    const params = new EthRedeemParams(this.oxify(data.secret), this.oxify(data.secretHash), null);
    return Observable.fromPromise(super.redeem(params));
  }

  getInitParams(address: string, amount: string): EthInitiateParams {
    return new EthInitiateParams(this.timeout, address, amount.toString());
  }

  oxify(param: string): string {
    return param.indexOf("0x") === -1 ? "0x" + param : param;
  }

  public transferTo(address, balance) {
    this.init();
    return Observable.fromPromise(super.sendEther(address, balance));
  }

  public init(): string {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = super.recover(xprivKey);
    super.login(keystore);
    return xprivKey;
  }

  public getERC20Token(token: TOKENS): TokenAtomicSwap {
    return TokenFactory.GetToken(token, this.engine);
  }
}
