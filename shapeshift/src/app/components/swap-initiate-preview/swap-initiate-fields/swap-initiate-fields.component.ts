import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swap-initiate-fields',
  templateUrl: './swap-initiate-fields.component.html',
  styleUrls: ['./swap-initiate-fields.component.scss'],
})
export class SwapInitiateFieldsComponent implements OnInit {
  @Input() offerTime;
  @Input() address;

  @Input() amount;
  @Input() coin;

  @Input() toReceiveCoin;
  @Input() toReceiveAmount;
  constructor() {
  }

  ngOnInit() {
  }

}
