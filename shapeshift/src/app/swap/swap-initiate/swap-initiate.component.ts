import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Coin} from '../../models/coin.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/app.state';
import {InitiateAction} from '../../actions/swap.action';
import {Observable} from 'rxjs/Observable';
import * as fromSwap from '../../selectors/swap.selector';
import {flyInOutAnimation} from '../../animations/animations';
import {AnimationEnabledComponent} from '../../common/animation.component';

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
  animations: [flyInOutAnimation],
})
export class SwapInitiateComponent extends AnimationEnabledComponent implements OnInit {
  $errorInitiate: Observable<string>;
  $loading: Observable<boolean>;

  private routeSub: Subscription;
  private offerTime: Date;
  private amount: number;
  private address: string;
  private coin: Coin;
  private toReceiveCoin: Coin;
  private toReceiveAmount;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    super();
    this.parseLink();
    this.$errorInitiate = this.store.select(fromSwap.getInitiateError);
    this.$loading = this.store.select(fromSwap.getInitiateLoading);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
  }

  startInitiate() {
    this.store.dispatch(new InitiateAction({address: this.address, amount: this.amount}));
  }

  private parseLink() {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      const stringified = atob(link);
      const data = JSON.parse(stringified);
      const offerTime = new Date(data[0]);
      const offerTimein2hrs = offerTime.setHours(offerTime.getHours() + 2);
      const now = new Date().getTime();
      this.offerTime = new Date(offerTimein2hrs - now);

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
}
