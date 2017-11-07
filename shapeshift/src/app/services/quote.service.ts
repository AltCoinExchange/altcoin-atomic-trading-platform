import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Quote} from '../models/quote.model';
import {Http} from '@angular/http';

@Injectable()
export class QuoteService {
  constructor(private http: Http) {
  }

  public getQuote(currency): Observable<Quote[]> {
    return this.fetch(currency);
  }

  public getQuotes(): Observable<Quote[]> {
    return this.fetch('', true);
  }

  /**
   *
   * @param currency
   * @param all
   */
  private fetch(currency, all: boolean = false): Observable<Quote | Quote[]> {
    const url = all === true ? 'http://coincap.io/front' : 'http://coincap.io/page/';
    return this.http.get(`${url}${currency}`).map(res => res.json());
  }
}
