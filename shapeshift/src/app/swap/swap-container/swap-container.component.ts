import { Component, OnInit, HostBinding } from '@angular/core';
import { MessageTypes } from '../../models/message-types.enum';

@Component({
  selector: 'app-swap-container',
  templateUrl: './swap-container.component.html',
  styleUrls: ['./swap-container.component.scss']
})
export class SwapContainerComponent implements OnInit {

  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;

  constructor() { 
    this.infoMsg = "FOR TESTNET USE ONLY";
  }

  ngOnInit() {
  }

}
