import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Go} from "../../actions/router.action";
import * as sideBAction from "../../actions/side-B.action";
import * as startAction from "../../actions/start.action";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {disAssembleLink} from "../../common/link-util";
import {Coin, CoinFactory} from "../../models/coins/coin.model";
import {MessageTypes} from "../../models/message-types.enum";
import {AppState} from "../../reducers/app.state";
import * as fromSwap from "../../selectors/swap.selector";
import {InitiateParams} from "altcoinio-wallet";
import {Coins} from "../../models/coins/coins.enum";
import {getBLoading} from "../../selectors/side-b.selector";

@Component({
  selector: "app-swap-initiate",
  templateUrl: "./swap-initiate.component.html",
  styleUrls: ["./swap-initiate.component.scss"],
  animations: [flyInOutAnimation, fadeInAnimation],
})
export class SwapInitiateComponent extends AnimationEnabledComponent implements OnInit, OnDestroy {
  $errorInitiate: Observable<string>;
  $loading: Observable<boolean>;
  $initiateData: Observable<any>;

  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  depositCoin: Coin;
  receiveCoin: Coin;
  private routeSub: Subscription;
  private offerTime: Date;
  private address: string;
  private link;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
    super();
    this.parseLink();
    this.infoMsg = "For testnet use only";
    this.$errorInitiate = this.store.select(fromSwap.getInitiateError);
    this.$loading = this.store.select(getBLoading);
    this.$initiateData = this.store.select(fromSwap.getInitiateData);

    this.store.dispatch(new startAction.SetActiveStepAction(2)); // step 1?
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
  }

  startInitiate() {
    this.store.dispatch(new sideBAction.InitiateAction(
      {
        address: this.address,
        amount: this.receiveCoin.amount,
        link: this.link,
        coin: this.receiveCoin,
        depositCoin: this.depositCoin,
      },
    ));
  }

  goToSwapComplete() {
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {

        this.store.dispatch(new Go({
          path: ["/b/complete"],
        }));

      }, 500);
    }, 1000);
  }

  private parseLink() {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params["link"];
      this.link = link;
      // this.store.dispatch(new swapAction.LoadInitiateDataAction(link));

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
