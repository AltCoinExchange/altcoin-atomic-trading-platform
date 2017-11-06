import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwapInitiatedComponent} from './swap-initiated/swap-initiated.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShapeShiftCommonModule} from '../../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    SwapInitiatedComponent,
  ],
  exports: [
    SwapInitiatedComponent,
  ],
})
export class SwapInitiatedModule {
}
