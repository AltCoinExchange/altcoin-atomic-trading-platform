import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../models/quote.model';
import * as wallet from 'wallet';
import {QuoteService} from './quote.service';
import {BtcWalletModel} from '../models/wallets/btc-wallet.model';


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

  public generateLink({depositCoin, receiveCoin}, wallets): Observable<string> {
    // if(depositCoin === 'btc')
    console.log(depositCoin);
    const wallet = wallets[receiveCoin.name];
    const address = receiveCoin.generateNewAddress(wallet);
    const data = [
      new Date(),
      depositCoin.amount,
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
