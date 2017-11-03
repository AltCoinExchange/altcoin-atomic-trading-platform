import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShapeshiftInputComponent} from './shapeshift-input/shapeshift-input.component';
import { ShapeshiftButtonComponent } from './shapeshift-button/shapeshift-button.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  declarations: [
    ShapeshiftInputComponent,
    ShapeshiftButtonComponent,
  ],
  exports: [
    ShapeshiftInputComponent,
    ShapeshiftButtonComponent,
  ],
})
export class ShapeShiftCommonModule {
}
