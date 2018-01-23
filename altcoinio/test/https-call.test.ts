import { HttpRequester } from '../src/app/common/util';
import { resetFakeAsyncZone, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { suite, test, slow, timeout } from 'mocha-typescript';
import {QuoteService} from "../src/app/services/quote.service";
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {TokenListComponent} from "../src/app/tokens/token-list/token-list.component";
// import 'core-js/es7/reflect';
// const Zone = require('zone.js');
// import 'reflect-metadata';

@suite(timeout(40000)) class Common {

  constructor() { }

  static before() {
    TestBed.configureTestingModule(
      {
        declarations: [
          TokenListComponent
        ],
        providers: [
          {
            provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }, deps: [MockBackend, BaseRequestOptions]
          },
          QuoteService
        ]
      });

    TestBed.overrideComponent(QuoteService, {
      set: {
        providers: [{ provide: QuoteService, useValue: "olala" }]
      }
    });
  }

  @test async Util() {
    const options = { method: 'GET', path: '/api/v2/get_address_balance/BTCTEST/mt6ejXYWbbGZQSHYGkLkUTS3jDaJddmaK9' };
    const result = await HttpRequester.Request(options);
    console.log(result);
  }


  @test async QuoteHistory() {
    const fixture = TestBed.createComponent(QuoteService);
    // const quotes = await qs.getHistory("BTC");
    console.log("test");
  }
}
