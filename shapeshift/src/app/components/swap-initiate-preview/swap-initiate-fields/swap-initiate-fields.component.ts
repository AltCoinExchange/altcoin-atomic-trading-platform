import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swap-initiate-fields',
  templateUrl: './swap-initiate-fields.component.html',
  styleUrls: ['./swap-initiate-fields.component.scss'],
})
export class SwapInitiateFieldsComponent implements OnInit {
  @Input() offerTime;
  @Input() address;

  @Input() depositCoin;

  @Input() receiveCoin;
  text;
  constructor() {
  }

  ngOnInit() {
  }

}
