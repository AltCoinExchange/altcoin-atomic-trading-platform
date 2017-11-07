import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Coin} from '../../models/coins/coin.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/app.state';
import {InitiateAction} from '../../actions/swap.action';
import {Observable} from 'rxjs/Observable';
import * as fromSwap from '../../selectors/swap.selector';
import * as swapAction from '../../actions/swap.action';
import * as startAction from '../../actions/start.action';
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
  $initiateData: Observable<any>;

  private routeSub: Subscription;
  private offerTime: Date;
  private amount: number;
  private address: string;
  private coin: Coin;
  private toReceiveCoin: Coin;
  private toReceiveAmount;

  private link;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    super();
    this.parseLink();
    this.$errorInitiate = this.store.select(fromSwap.getInitiateError);
    this.$loading = this.store.select(fromSwap.getInitiateLoading);
    this.$initiateData = this.store.select(fromSwap.getInitiateData);

    this.store.dispatch(new startAction.SetActiveStepAction(3));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
  }

  startInitiate() {
    this.store.dispatch(new InitiateAction(
      {
        address: this.address,
        amount: this.amount,
        link: this.link,
      },
    ));
  }

  private parseLink() {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      this.link = link;
      this.store.dispatch(new swapAction.LoadInitiateDataAction(link));

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
