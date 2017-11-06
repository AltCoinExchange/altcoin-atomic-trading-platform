import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwapInitiatedComponent} from './swap-initiated/swap-initiated.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShapeShiftCommonModule} from '../../common/common.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
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
