import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swap-initiated',
  templateUrl: './swap-initiated.component.html',
  styleUrls: ['./swap-initiated.component.scss'],
})
export class SwapInitiatedComponent implements OnInit {
  @Input() initiateData: any;
  text;
  participateLink: string;

  constructor() {
  }

  ngOnInit() {
    const data = [
      this.initiateData.contractHex,
      this.initiateData.contractTxHex,
    ];
    const dataStringified = JSON.stringify(data);
    this.participateLink = btoa(dataStringified);
    // TODO generate other sides address
  }

}
