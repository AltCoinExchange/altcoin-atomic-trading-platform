import {ChangeDetectorRef, Component, OnInit, HostListener} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AppState} from "../../reducers/app.state";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {getActiveStep, getDepositCoin, getReceiveCoin} from "../../selectors/start.selector";
import {getAProgress} from "../../selectors/side-a.selector";
import {SwapProgress} from "../../models/swap-progress.enum";
import { fadeInOutAnimation } from "../../animations/animations";


export class Filter {
  constructor(public name: string, public icon: string) {
  }
}

@Component({
  selector: "app-swap-container",
  templateUrl: "./swap-container.component.html",
  styleUrls: ["./swap-container.component.scss"],
  animations: [fadeInOutAnimation]
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
  fadeInOut = 'fadeInOut';
  safeToClose: boolean = true;
  $activeStep : Observable<any>;
  $swapProgress : Observable<any>;
  swapSubscription : Subscription;
  $fromCoin : Observable<any>;
  $toCoin : Observable<any>;

  constructor(private store: Store<AppState>) {
    this.watchSwapProgress();
    this.$fromCoin = this.store.select(getDepositCoin);
    this.$toCoin = this.store.select(getReceiveCoin);
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
      console.log('step is ', step);
      console.log('progres is ', progress)
      if((step > 1) && (progress !== SwapProgress.Redeemed))
        this.safeToClose = false;
      else
        this.safeToClose = true;
    });
  }

}