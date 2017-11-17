import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WalletComponent} from './wallet.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShapeShiftCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '', component: WalletComponent
      }
    ]),
  ],
  declarations: [
    WalletComponent
  ],
})
export class WalletModule {
}
