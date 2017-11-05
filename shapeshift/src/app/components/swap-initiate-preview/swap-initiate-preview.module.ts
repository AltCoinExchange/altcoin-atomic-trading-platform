import {NgModule} from '@angular/core';
import {SwapInitiateFieldsComponent} from './swap-initiate-fields/swap-initiate-fields.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShapeShiftCommonModule} from '../../common/common.module';

@NgModule({
  imports: [
    ShapeShiftCommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    SwapInitiateFieldsComponent,
  ],
  exports: [
    SwapInitiateFieldsComponent,
  ],
})
export class SwapInitiatePreviewModule {
}
