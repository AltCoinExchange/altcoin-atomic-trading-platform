import {Component, OnInit, ViewEncapsulation,} from '@angular/core';

import * as btcswap from 'btc-atomic-swap';
import {Headers, Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public altcoinLogo = 'assets/icon/altcoin-icon.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(private http: Http) {
    console.log(btcswap);
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.set('Authorization', 'Basic ' + window.btoa('bedrock:bedrock'));

    // this.http.post('http://bedrock:bedrock@34.215.58.192:8013/', {
    //   'user': 'bedrock',
    //   'password': 'bedrock',
    //   'method': 'estimatesmartfee',
    //   'params': [6],
    //   'auth': 'bedrock:bedrock'
    // }, options).subscribe(r => {
    //   console.log(r);
    // });
    btcswap.initiate("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.01");
  }

  public ngOnInit() {

  }

}

