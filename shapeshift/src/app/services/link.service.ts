import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../models/quote.model';
import {QuoteService} from './quote.service';


@Injectable()
export class LinkService implements OnInit {

  private quotes: Map<string, Quote>;

  constructor(private service: QuoteService) {
    this.quotes = new Map<string, Quote>();
    this.service.SharedList.subscribe(lst => this.quotes = lst);
    this.service.getQuotes();
  }

  ngOnInit() {
    this.service.SharedList.subscribe(lst => this.quotes = lst);
    this.service.getQuote('ETH');
  }


  // TODO this is obviously wrong, wallet needs to be more generic
  // TODO generate address for different wallets

  public generateLink(coins, wallets): Observable<string> {

    const wallet = wallets[coins.receiveCoin.name];
    const address = coins.receiveCoin.generateNewAddress(wallet);
    const data = [
      new Date(),
      coins.depositCoin.amount,
      address.toString(),
      'btc', // TODO ........
      'eth', // TODO in exchange for currency
      '1' // TODO in exchange for amount
    ];

    const stringified = JSON.stringify(data);
    const link = btoa(stringified);

    return Observable.of(link);
  }
}
