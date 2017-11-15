import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';
import {SwapSpinners} from '../../models/swap-spinners.enum';
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {Observable} from "rxjs/Observable";
import {getInitateLink, getSwapStatus} from "../../selectors/start.selector";
import {Subscription} from "rxjs/Subscription";
import * as swapAction from '../../actions/start.action';

@Component({
  selector: 'app-swap-complete',
  templateUrl: './swap-complete.component.html',
  styleUrls: ['./swap-complete.component.scss'],
  animations: [flyInOutAnimation],
})
export class SwapCompleteComponent extends AnimationEnabledComponent implements OnInit {

  initiated: SwapSpinners;
  participated: SwapSpinners;
  redeeming: SwapSpinners;
  done: SwapSpinners;

  swapSpinners: typeof SwapSpinners = SwapSpinners;

  $link: Observable<string>;

  $swapStatus: Observable<any>;
  swapStatusSubscription: Subscription;

  $status;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    super();

    this.store.dispatch(new swapAction.SetActiveStepAction(3));
    this.$link = this.store.select(getInitateLink);
    this.$swapStatus = this.store.select(getSwapStatus);

    this.$status = this.store.select(getSwapStatus);
  }

  ngOnInit() {
    this.$status.subscribe(r => {
      setTimeout(() => {
        this.cd.detectChanges();
      });
    });
  }

  ngOnDestroy() {
    this.swapStatusSubscription.unsubscribe();
  }

}
