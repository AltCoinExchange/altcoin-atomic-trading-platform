import { Component, OnInit, HostBinding } from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-swap-complete',
  templateUrl: './swap-complete.component.html',
  styleUrls: ['./swap-complete.component.scss'],
  animations: [flyInOutAnimation]
})
export class SwapCompleteComponent extends AnimationEnabledComponent implements OnInit {

  initiated: boolean;
  participated: boolean;
  redeeming: boolean;
  done: boolean;

  constructor() { 
    super();
    this.initiated = true;
    this.participated = false;
    this.redeeming = false;
    this.done = false;
  }

  ngOnInit() {
  }

}
