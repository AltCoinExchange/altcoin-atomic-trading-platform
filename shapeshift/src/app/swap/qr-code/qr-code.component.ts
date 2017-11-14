import {Component, HostBinding, OnInit} from '@angular/core';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation, fadeInAnimation} from '../../animations/animations';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapAction from '../../actions/start.action';
import { MessageTypes } from '../../models/message-types.enum';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  animations: [flyInOutAnimation, fadeInAnimation]
})
export class QrCodeComponent extends AnimationEnabledComponent implements OnInit {
  @HostBinding('class') classes = 'swap';

  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;
  waitingDepositSpinner : boolean;
  QRCodeValue: string;
 
  constructor(private store: Store<fromSwap.State>) {
    super();
    this.infoMsg = "FOR TESTNET USE ONLY";
    this.waitingDepositSpinner = true;
    this.setQRCodeValue();
    setTimeout(() => {
      this.depositSuccess();
    }, 2000);
  }

  setQRCodeValue(){
    this.QRCodeValue = 'Random string';
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
