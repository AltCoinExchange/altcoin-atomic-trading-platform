import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { ShapeShiftCommonModule } from '../common/common.module';
import { WalletComponent } from './wallet.component';
import { EmptyWalletComponent } from './empty-wallet/empty-wallet.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { WritePhraseComponent } from './write-phrase/write-phrase.component';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: WalletComponent},
      { path: 'empty', component: EmptyWalletComponent },
      { path: 'create', component: CreateWalletComponent },
      { path: 'write', component: WritePhraseComponent }
    ]),
    MatProgressSpinnerModule,
    ShapeShiftCommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [
    WalletComponent,
    EmptyWalletComponent,
    CreateWalletComponent,
    WritePhraseComponent,
  ]
})
export class WalletModule {
}
