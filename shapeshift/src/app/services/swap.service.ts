import * as btcswap from 'btc-atomic-swap';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SwapService {

  public initiate({address, amount}): Observable<any> {
    const initiateResult = btcswap.initiate(address, amount);
    return Observable.fromPromise(initiateResult);
  }

}
