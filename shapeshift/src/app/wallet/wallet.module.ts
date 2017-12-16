import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WalletComponent} from './wallet.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShapeShiftCommonModule} from '../common/common.module';
import {MatProgressSpinnerModule} from "@angular/material";
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { FormsModule } from '@angular/forms';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '', component: WalletComponent
      }
    ]),
    MatProgressSpinnerModule,
    ShapeShiftCommonModule,
    FormsModule
  ],
  declarations: [
    WalletComponent
  ],
})
export class WalletModule {
}
