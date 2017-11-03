import {NgModule} from '@angular/core';
import {SwapInputsComponent} from './swap-inputs.component';
import {ShapeShiftCommonModule} from '../../common/common.module';

@NgModule({
  imports: [
    ShapeShiftCommonModule,
  ],
  declarations: [
    SwapInputsComponent
  ],
  exports: [
    SwapInputsComponent
  ],
})
export class SwapInputsModule {
}
