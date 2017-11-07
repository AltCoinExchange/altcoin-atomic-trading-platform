import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../models/quote.model';
import {QuoteService} from './quote.service';
import {assembleLink} from '../common/link-util';


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
