import {ChangeDetectorRef, Component, OnInit, HostListener} from "@angular/core";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {AppState} from "../../reducers/app.state";
import {Store} from "@ngrx/store";
import * as sideB from "../../actions/side-B.action";
import {CoinFactory} from "../../models/coins/coin.model";
import {OrderMatchingService} from "../../services/order-matching.service";
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {FormControl} from "@angular/forms";
import {startWith} from "rxjs/operators/startWith";
import {map} from "rxjs/operators/map";
import {getActiveStep} from "../../selectors/start.selector";
import {getAProgress} from "../../selectors/side-a.selector";
import {SwapProgress} from "../../models/swap-progress.enum";
import * as moment from 'moment';

export class Filter {
  constructor(public name: string, public icon: string) {
  }
}

@Component({
  selector: "app-swap-container",
  templateUrl: "./swap-container.component.html",
  styleUrls: ["./swap-container.component.scss"]
})
export class SwapContainerComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    if(!this.safeToClose){
      let msg = 'Your swap will be cancelled if you leave';
      $event.returnValue = msg;
      return msg;
    }
  }

  moment = moment;
  safeToClose: boolean = true;
  $activeStep : Observable<any>;
  $swapProgress : Observable<any>;
  swapSubscription : Subscription;

  constructor(private store: Store<AppState>) {
    this.watchSwapProgress();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.swapSubscription.unsubscribe();
  }

  watchSwapProgress(){
    this.$activeStep = this.store.select(getActiveStep);
    this.$swapProgress = this.store.select(getAProgress);
    let swapObs = Observable.combineLatest(this.$activeStep, this.$swapProgress);
    this.swapSubscription = swapObs.subscribe(([step, progress]) => {
      if((step > 1) && (progress !== SwapProgress.Redeemed))
        this.safeToClose = false;
      else
        this.safeToClose = true;
    });
  }

}