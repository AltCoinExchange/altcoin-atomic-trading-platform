import {Component, HostBinding, OnInit} from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapAction from '../../actions/start.action';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  animations: [flyInOutAnimation]
})
export class QrCodeComponent extends AnimationEnabledComponent implements OnInit {
  @HostBinding('class') classes = 'swap';

  waitingDepositSpinner : boolean;

  constructor(private store: Store<fromSwap.State>) {
    super();
    this.waitingDepositSpinner = true;
    setTimeout(() => {
      this.depositSuccess();
    }, 2000);
  }

  depositSuccess(){
    this.waitingDepositSpinner = false;
    setTimeout(() => {
      this.formFlyOut();
        setTimeout(() => {
          //start swap action
        }, 500);
    }, 500);
  }

  ngOnInit() {
  }

}
