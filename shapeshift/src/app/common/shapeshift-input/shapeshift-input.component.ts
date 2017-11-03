import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../models/coin.model';

@Component({
  selector: 'app-shapeshift-input',
  templateUrl: './shapeshift-input.component.html',
  styleUrls: ['./shapeshift-input.component.scss']
})
export class ShapeshiftInputComponent implements OnInit {
  @Input() coin: Coin;
  @Input() disabled: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
