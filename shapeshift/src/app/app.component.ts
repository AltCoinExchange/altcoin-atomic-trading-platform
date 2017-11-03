import {Component, OnInit, ViewEncapsulation,} from '@angular/core';

// import * as btcswap from 'btc-atomic-swap';

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

  constructor() {
    const data = {
      t: new Date(),
      a: '0.1323',
      b: 'n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG',
    };
    console.log(data);
    const strinfigied = JSON.stringify(data);
    console.log(btoa(strinfigied));

  }

  public ngOnInit() {

  }
}
