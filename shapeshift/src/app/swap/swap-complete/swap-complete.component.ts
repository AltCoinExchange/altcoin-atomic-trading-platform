import { Component, OnInit, HostBinding } from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';
import { SwapSpinners } from '../../models/swap-spinners.enum';
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {Observable} from "rxjs/Observable";
import {getInitateLink} from "../../selectors/start.selector";

@Component({
  selector: 'app-swap-complete',
  templateUrl: './swap-complete.component.html',
  styleUrls: ['./swap-complete.component.scss'],
  animations: [flyInOutAnimation]
})
export class SwapCompleteComponent extends AnimationEnabledComponent implements OnInit {

  initiated: SwapSpinners;
  participated: SwapSpinners;
  redeeming: SwapSpinners;
  done: SwapSpinners;

  swapSpinners: typeof SwapSpinners = SwapSpinners;

  $link: Observable<string>;

  constructor(private store: Store<AppState>) {
    super();

    this.$link = this.store.select(getInitateLink);

  }

  ngOnInit() {
    this.initiated = this.swapSpinners.Active;
    this.participated = this.swapSpinners.Waiting;
    this.redeeming = this.swapSpinners.Waiting;
    this.done = this.swapSpinners.Waiting;
  }

}
