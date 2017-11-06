import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Quote} from '../models/quote.model';

@Injectable()
export class QuoteService {
  // TODO this is obviously wrong, wallet needs to be more generic
  // TODO generate address for different wallets
  SharedList: Observable<Quote[]>;

  private listObserver: Observer<Quote[]>;
  private sharedList: Quote[];

  constructor() {
    this.sharedList = [];
    this.SharedList = new Observable<Quote[]>(x => this.listObserver = x).share();
  }

  public getQuote(currency)  {
    const that = this;
    this.fetch(currency).then(function(result){
      that.sharedList = [result as Quote];
      that.listObserver.next(that.sharedList);
    });

    return Observable.of(null);
  }

  /**
   *
   * @param currency
   * @returns {Promise<any>}
   */
  private fetch(currency) {
    return new Promise(function(resolve, rejc) {
      const req = new XMLHttpRequest();
      req.open('GET', `http://coincap.io/page/${currency}`);

      req.onload = () => {
        try {
          resolve(JSON.parse(req.response));
        } catch (e) {
          rejc(e);
        }
      };

      req.send();
    });
  }
}
