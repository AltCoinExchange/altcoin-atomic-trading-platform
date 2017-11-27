import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {assembleLink} from '../common/link-util';
import {BigchainDbService} from './bigchain-db.service';


@Injectable()
export class LinkService {

  public generateLink(coins): Observable<string> {
    const address = coins.receiveCoin.generateNewAddress('');
    console.log(coins.receiveCoin.name, address);
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
