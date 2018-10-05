import {NgModule} from '@angular/core';
import {SwapInputsComponent} from './swap-inputs.component';
import {AltcoinIoCommonModule} from '../../common/common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    AltcoinIoCommonModule,
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
