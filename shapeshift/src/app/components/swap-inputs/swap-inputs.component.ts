import {Component, Input, OnInit} from '@angular/core';
import {SwapProcess} from '../../models/swap-process.model';

@Component({
  selector: 'app-swap-inputs',
  templateUrl: './swap-inputs.component.html',
  styleUrls: ['./swap-inputs.component.scss']
})
export class SwapInputsComponent implements OnInit {
  @Input() swapProcess: SwapProcess;
  constructor() { }

  ngOnInit() {
  }

}
