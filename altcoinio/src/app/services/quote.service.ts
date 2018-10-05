import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Quote} from '../models/quote.model';
import {Http} from '@angular/http';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {interval} from "rxjs/observable/interval";

@Injectable()
export class QuoteService {

  /**
   * Multiple request session
   */
  private multiSession: string;

  /**
   * Single request session
   */
  private singleSession: string;

  /**
   * Subscribe to live quote
   * @type {ReplaySubject<any>}
   */
  public static quoteSubject = new ReplaySubject<any>();

  constructor(private http: Http) {
  }

  public getQuote(currency): Observable<Quote[] | Quote> {
    return this.fetch(currency);
  }

  public getQuotes(): Observable<Quote[] | Quote> {
    return this.fetch('', true);
  }

  public getHistory(coin: string, range: string = "365day") {
    const url = 'https://coincap.io/history/';
    return this.http.get(`${url}${range}/${coin}`).map((res) => {

      return res.json()
    });
  }

  public getLiveQuotesObj() {
    return QuoteService.quoteSubject.asObservable();
  }

  /**
   * Get live quotes using the session
   * If session is expired then it is recalculated and sent again
   */
  public getLiveQuotes() {
    try {
      this.singleSession = this.getRandomSessionString();
      if (!this.multiSession) {
        return this.initiateSession().switchMap(() => this.getLiveQuotes());
      }
      return Observable.interval(10000).switchMap(() => this.http.get(`https://coincap.io/socket.io/?EIO=3&transport=polling&t=${this.singleSession}&sid=${this.multiSession}`).map((response) => {
        // map
        try {
          // Filter JSON
          const filtered = this.filterQuoteString(response.text());
          QuoteService.quoteSubject.next(filtered);
          return filtered;
        } catch (ex) {
          console.log("Cannot parse quotes");
        }
      }).catch((e) => {
        this.initiateSession().subscribe((e) => {
          console.log("Initiated coincap session");
        });
        return QuoteService.quoteSubject.asObservable();
      }));
    } catch (e) {
      console.log("Error getting live quotes from coincap.");
    }
  }

  public initiateSession() {
    try {
      this.singleSession = this.getRandomSessionString();
      const url = 'https://coincap.io/socket.io/?EIO=3&transport=polling&t=' + this.singleSession;
      return this.http.get(`${url}`).map((response) => {
        const filtered = this.filterInitiateString(response.text());
        const sid = JSON.parse(filtered).sid;
        this.multiSession = sid;
        return sid;
      });
    } catch (e) {
      console.log("Error initiating coincap session.");
    }
  }

  public getRandomSessionString() {
    return "M6V" + this.getRandomStr(4);
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

  /**
   * Filter initiate session from garbage string intentionally placed from coincap
   * @param {String} str
   * @returns {string}
   */
  private filterInitiateString(str: String) {
    return str.substr(str.indexOf("{"), str.lastIndexOf("}") - str.indexOf("{") + 1);
  }

  /**
   * Filter quotes from garbage string intentionally placed from coincap
   * @param {String} str
   * @returns {any[]}
   */
  private filterQuoteString(str: String) {
    const reg = /\[(.*?)\]/g;
    let m: any[];
    const quotes = [];

    while (m = reg.exec(str.toString())) {
      quotes.push(JSON.parse(`[${m[1]}]`)[1].msg);
    }
    // console.log(quotes);
    return quotes;
  }

  /**
   * Get random string between: aA-zZ
   * @param {number} len
   * @returns {string}
   */
  private getRandomStr(len: number = 1) {
    let str = "";
    for (let i = 0; i <= 1; i++) {
      const upperOrLower = Math.round(Math.random());
      if (upperOrLower == 1) {
        str += String.fromCharCode(this.getRandomBetween(65, 90));
      } else {
        str += String.fromCharCode(this.getRandomBetween(97, 122));
      }
    }
    return str;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  private getRandomBetween(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
