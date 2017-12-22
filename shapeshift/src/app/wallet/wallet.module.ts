import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { ShapeShiftCommonModule } from '../common/common.module';
import { AllCoinsDialogComponent } from './all-coins.dialog';
import { WalletComponent } from './wallet.component';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

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
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule
  ],
  declarations: [
    WalletComponent,
    AllCoinsDialogComponent
  ],
  entryComponents: [
    AllCoinsDialogComponent
  ]
})
export class WalletModule {
}
