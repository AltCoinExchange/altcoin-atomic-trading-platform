import {NgModule} from '@angular/core';
import {SwapInputsComponent} from './swap-inputs.component';
import {ShapeShiftCommonModule} from '../../common/common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    ShapeShiftCommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
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
