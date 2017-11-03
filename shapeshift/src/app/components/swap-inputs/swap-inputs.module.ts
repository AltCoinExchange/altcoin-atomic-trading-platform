import {NgModule} from '@angular/core';
import {SwapInputsComponent} from './swap-inputs.component';
import {ShapeShiftCommonModule} from '../../common/common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ShapeShiftCommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    SwapInputsComponent,
  ],
  exports: [
    SwapInputsComponent,
  ],
})
export class SwapInputsModule {
}
