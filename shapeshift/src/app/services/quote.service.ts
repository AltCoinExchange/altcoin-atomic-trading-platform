import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Quote} from '../models/quote.model';
import {Http} from '@angular/http';

@Injectable()
export class QuoteService {
  constructor(private http: Http) {
  }

  public getQuote(currency): Observable<Quote[] | Quote> {
    return this.fetch(currency);
  }

  public getQuotes(): Observable<Quote[] | Quote> {
    return this.fetch('', true);
  }

  /**
   *
   * @param currency
   * @param all
   */
  private fetch(currency, all: boolean = false): Observable<Quote | Quote[]> {
    try {
      const url = all === true ? 'https://coincap.io/front' : 'https://coincap.io/page/';
      return this.http.get(`${url}${currency}`).map(res => res.json());
    } catch (ex) {
      const url = all === true ? 'https://api.cryptonator.com/api/ticker/' : 'https://coincap.io/page/';
      return this.http.get(`${url}${currency}-usd`).map(res => res.json());
    }
  }
}
