import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {entranceAnimation } from '../../animations/animations';
import { MessageTypes } from '../../models/message-types.enum'
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss'],
  animations: [entranceAnimation]
})
export class InfoMessageComponent implements OnInit {

    @Input() message: string;
    @Input() type: MessageTypes;

    messageTypes: typeof MessageTypes = MessageTypes;
    animateMsg: string;

    constructor() {
        
    }

    animateInfoMessage(){
      this.animateMsg = 'hidden';
      if(this.message !== undefined && this.message !== null && this.message !== '')
        setTimeout(() => { 
          this.animateMsg = 'entrance';
        },500);
    }

    ngOnInit() {
      this.animateInfoMessage();
    }

}