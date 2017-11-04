import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import * as btcswap from 'btc-atomic-swap';
import {Coin} from '../../models/coin.model';

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
})
export class SwapInitiateComponent implements OnInit {
  private routeSub: Subscription;

  private offerTime: Date;
  private amount: number;
  private address: string;
  private coin: Coin;
  private toReceiveCoin: Coin;
  private toReceiveAmount;

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      const stringified = atob(link);
      const data = JSON.parse(stringified);
      this.offerTime = data[0];
      this.amount = data[1];
      this.address = data[2];
      const coin = data[3];
      if (coin === 'btc') { // obvious tODO
        this.coin = {
          name: 'BTC',
          amount: undefined,
          icon: 'assets/icon/btc-icon.png',
          iconOutline: 'assets/icon/btc-icon-o.png',
        } as Coin;
      }

      const givenCoin = data[4];
      this.toReceiveAmount = data[5];

      if (givenCoin === 'eth') { // obvious TODO
        this.toReceiveCoin = {
          name: 'ETH',
          amount: undefined,
          icon: 'assets/icon/eth-icon.png',
          iconOutline: 'assets/icon/eth-icon-o.png',
        } as Coin;
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
  }

  startInitiate() {
    btcswap.initiate(this.address, this.amount);
  }
}
