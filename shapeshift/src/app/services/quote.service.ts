import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Quote} from '../models/quote.model';

@Injectable()
export class QuoteService {
  SharedList: Observable<Map<string, Quote>>;

  private listObserver: Observer<Map<string, Quote>>;
  private sharedList: Map<string, Quote>;

  constructor() {
    this.sharedList = new Map<string, Quote>();
    this.SharedList = new Observable<Map<string, Quote>>(x => this.listObserver = x).share();
  }

  public getQuote(currency)  {
    const that = this;
    this.fetch(currency).then(function(result: Quote){
      that.sharedList[result.id] = result;
      that.listObserver.next(that.sharedList);
    });

    return Observable.of(null);
  }

  public getQuotes()  {
    const that = this;
    this.fetch('', true).then(function(result: Quote[]){
      result.forEach(value =>  that.sharedList.set(value.short, value));
      that.listObserver.next(that.sharedList);
    });

    return Observable.of(null);
  }

  /**
   *
   * @param currency
   * @param all
   * @returns {Promise<any>}
   */
  private fetch(currency, all: boolean = false) {
    return new Promise(function(resolve, rejc) {
      const req = new XMLHttpRequest();
      const url = all === true ? 'http://coincap.io/front' : 'http://coincap.io/page/';

      req.open('GET', `${url}${currency}`);

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
