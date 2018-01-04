import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatCheckboxModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ShapeShiftCommonModule } from '../common/common.module';
import { WalletComponent } from './wallet.component';
import { EmptyWalletComponent } from './empty-wallet/empty-wallet.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { WritePhraseComponent } from './write-phrase/write-phrase.component';
import { ImportWalletComponent } from './import-wallet/import-wallet.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: WalletComponent},
      { path: 'empty', component: EmptyWalletComponent },
      { path: 'create', component: CreateWalletComponent },
      { path: 'write', component: WritePhraseComponent },
      { path: 'import', component: ImportWalletComponent }
    ]),
    MatProgressSpinnerModule,
    ShapeShiftCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    WalletComponent,
    EmptyWalletComponent,
    CreateWalletComponent,
    WritePhraseComponent,
    ImportWalletComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class WalletModule {
}
