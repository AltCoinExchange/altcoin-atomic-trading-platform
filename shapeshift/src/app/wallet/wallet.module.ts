import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WalletComponent} from './wallet.component';

@NgModule({
  imports: [
    CommonModule,
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
