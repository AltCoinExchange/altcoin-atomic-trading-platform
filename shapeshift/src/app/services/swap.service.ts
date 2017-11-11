import * as btcswap from 'btc-atomic-swap';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as wallet from 'wallet';
import {BigchainDbService} from "./bigchain-db.service";

@Injectable()
export class SwapService {
  constructor(private bigChainDb: BigchainDbService) {

  }

  public initiate({address, amount, coin, link}): Observable<any> {
    let initiateResult = null;
    switch (coin.name) {
      case 'BTC':
        initiateResult = btcswap.initiate(address, amount);
        break;
      case 'ETH':
        const eth = new wallet.Wallet.Ethereum.EthWallet();
        const acc = eth.login(localStorage.getItem('ethkeystore'), localStorage.getItem('ethprivkey'));
        initiateResult = eth.atomicSwap.Initiate(7200, '', address, amount);
        break;
      default:
        break;
    }
    return Observable.fromPromise(initiateResult);
  }

  public initiated({link, data}) {
    this.bigChainDb.send({
      id: link,
      data: data,
    });
  }

  public auditContract({contractHex, contractTxHex}): Observable<any> {
    const auditContractResults = btcswap.auditContract(contractHex, contractTxHex);
    return Observable.of(auditContractResults);
  }


  public waitForInitiate(link: string) {
    const due = 600000; // 20 minutes
    return Observable
      .interval(2000)
      .flatMap(() => {
        return this.bigChainDb.find(link);
      })
      .first((x: any[]) => {
        return !!x.length;
      })
      .timeout(due);
  }

}
