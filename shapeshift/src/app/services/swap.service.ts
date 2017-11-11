import * as btcswap from 'btc-atomic-swap';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BigchainDbService} from './bigchain-db.service';

@Injectable()
export class SwapService {
  constructor(private bigChainDb: BigchainDbService) {

  }

  public initiate({address, amount, coin,}): Observable<any> {
    const initiateResult = coin.initiate(address, amount);
    return initiateResult;
  }

  public informInitiated({link, data}) {
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
