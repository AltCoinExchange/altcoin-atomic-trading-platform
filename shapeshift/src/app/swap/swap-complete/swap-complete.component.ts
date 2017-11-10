import { Component, OnInit, HostBinding } from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';
import { SwapSpinners } from '../../models/swap-spinners.enum';

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

  constructor() { 
    super();
  }

  ngOnInit() {
    this.initiated = this.swapSpinners.Completed;
    this.participated = this.swapSpinners.Active;
    this.redeeming = this.swapSpinners.Waiting;
    this.done = this.swapSpinners.Waiting;
  }

}
