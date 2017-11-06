import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swap-initiated',
  templateUrl: './swap-initiated.component.html',
  styleUrls: ['./swap-initiated.component.scss']
})
export class SwapInitiatedComponent implements OnInit {
  @Input() initiateData: any;
  constructor() { }

  ngOnInit() {
  }

}
