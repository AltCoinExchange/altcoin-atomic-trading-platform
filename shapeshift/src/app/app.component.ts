import {Component, OnInit, ViewEncapsulation,} from '@angular/core';

import * as btcswap from 'btc-atomic-swap';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public altcoinLogo = 'assets/icon/altcoin-icon.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor() {
    // btcswap.initiate('n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG', '0.01');
  }

  public ngOnInit() {

  }
}
