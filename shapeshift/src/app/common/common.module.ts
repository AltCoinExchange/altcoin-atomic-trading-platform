import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShapeshiftInputComponent} from './shapeshift-input/shapeshift-input.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ShapeshiftInputComponent,
  ],
  exports: [
    ShapeshiftInputComponent,
  ],
})
export class ShapeShiftCommonModule {
}
