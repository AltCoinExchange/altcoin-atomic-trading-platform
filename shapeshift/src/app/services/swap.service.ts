import * as btcswap from 'btc-atomic-swap';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as wallet from 'wallet';

@Injectable()
export class SwapService {

  public initiate({address, amount, coin}): Observable<any> {
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

  public auditContract({contractHex, contractTxHex}): Observable<any> {
    const auditContractResults = btcswap.auditContract(contractHex, contractTxHex);
    return Observable.of(auditContractResults);
  }

}
