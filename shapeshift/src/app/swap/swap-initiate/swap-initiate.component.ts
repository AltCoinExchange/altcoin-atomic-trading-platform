import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Coin, CoinFactory} from '../../models/coins/coin.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/app.state';
import * as swapAction from '../../actions/swap.action';
import {InitiateAction} from '../../actions/swap.action';
import {Observable} from 'rxjs/Observable';
import * as fromSwap from '../../selectors/swap.selector';
import * as startAction from '../../actions/start.action';
import {flyInOutAnimation} from '../../animations/animations';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {disAssembleLink} from '../../common/link-util';
import {Coins} from '../../models/coins/coins.enum';

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

  private depositCoin: Coin;
  private address: string;
  private receiveCoin: Coin;

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
        amount: this.receiveCoin.amount,
        link: this.link,
      },
    ));
  }

  private parseLink() {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      this.link = link;
      this.store.dispatch(new swapAction.LoadInitiateDataAction(link));

      const data = disAssembleLink(link);

      const offerTime = new Date(data.date);
      const offerTimein2hrs = offerTime.setHours(offerTime.getHours() + 2);
      const now = new Date().getTime();

      this.offerTime = new Date(offerTimein2hrs - now);

      this.receiveCoin = CoinFactory.createCoin(Coins[data.receiveCoin]);
      this.receiveCoin.amount = data.receiveAmount;
      this.depositCoin = CoinFactory.createCoin(Coins[data.depositCoin]);
      this.depositCoin.amount = data.depositAmount;
      this.address = data.address;
    });
  }
}
