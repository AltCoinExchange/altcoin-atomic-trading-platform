import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../models/coins/coin.model';
import {NG_VALUE_ACCESSOR,} from '@angular/forms';
import {ValueAccessorBase} from '../value-accessor-base';


@Component({
  selector: 'app-shapeshift-input',
  templateUrl: './shapeshift-input.component.html',
  styleUrls: ['./shapeshift-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ShapeshiftInputComponent,
      multi: true,
    },
  ],
})
export class ShapeshiftInputComponent extends ValueAccessorBase<Number> implements OnInit {
  @Input() coin: Coin;
  @Input() disabled: boolean = false;
  @Input() type = 'number';
  @Input() value;
  @Input() label: String;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
