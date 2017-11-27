import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Coin} from '../../models/coins/coin.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/app.state';
import * as swapAction from '../../actions/swap.action';
import {InitiateAction} from '../../actions/swap.action';
import {Observable} from 'rxjs/Observable';
import * as fromSwap from '../../selectors/swap.selector';
import * as startAction from '../../actions/start.action';
import {flyInOutAnimation, fadeInAnimation} from '../../animations/animations';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {disAssembleLink} from '../../common/link-util';
import {Coins} from '../../models/coins/coins.enum';
import { MessageTypes } from '../../models/message-types.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
  animations: [flyInOutAnimation, fadeInAnimation],
})
export class SwapInitiateComponent extends AnimationEnabledComponent implements OnInit, OnDestroy {
  $errorInitiate: Observable<string>;
  $loading: Observable<boolean>;
  $initiateData: Observable<any>;

  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;

  private routeSub: Subscription;
  private offerTime: Date;

  depositCoin: Coin;
  private address: string;
  receiveCoin: Coin;

  private link;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
    super();
    this.parseLink();
    this.infoMsg = "FOR TESTNET USE ONLY";
    this.$errorInitiate = this.store.select(fromSwap.getInitiateError);
    this.$loading = this.store.select(fromSwap.getInitiateLoading);
    this.$initiateData = this.store.select(fromSwap.getInitiateData);

    this.store.dispatch(new startAction.SetActiveStepAction(2)); //step 1?
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
        coin: this.receiveCoin,
        depositCoin: this.depositCoin,
      },
    ));

    // this.goToSwapComplete();
  }

  goToSwapComplete() {
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {
        this.router.navigate(['/complete']);
      }, 500);
    }, 1000);
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

      // this.receiveCoin = CoinFactory.createCoin(Coins[data.receiveCoin]);
      // this.receiveCoin.amount = data.receiveAmount;
      // this.depositCoin = CoinFactory.createCoin(Coins[data.depositCoin]);
      this.depositCoin.amount = data.depositAmount;
      this.address = data.address;
    });
  }
}
