import {Component, Input, OnInit} from '@angular/core';
import {SwapSpinners} from "../../models/swap-spinners.enum";

@Component({
  selector: 'app-shapeshift-status-spinner',
  templateUrl: './shapeshift-status-spinner.component.html',
  styleUrls: ['./shapeshift-status-spinner.component.scss']
})
export class ShapeshiftStatusSpinnerComponent implements OnInit {
  SwapSpinners = SwapSpinners;

  @Input() status;
  @Input() text;

  constructor() {
  }

  ngOnInit() {
  }

}
