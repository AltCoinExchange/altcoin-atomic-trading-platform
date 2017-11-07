import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {assembleLink} from '../common/link-util';


@Injectable()
export class LinkService {

  constructor() {
  }


  public generateLink(coins, wallets): Observable<string> {
    const wallet = wallets[coins.receiveCoin.name];
    const address = coins.receiveCoin.generateNewAddress(wallet);
    const link = assembleLink(
      coins.depositCoin.name,
      coins.depositCoin.amount,
      coins.receiveCoin.name,
      coins.receiveCoin.amount,
      address,
      new Date(),
    );
    return Observable.of(link);
  }
}
