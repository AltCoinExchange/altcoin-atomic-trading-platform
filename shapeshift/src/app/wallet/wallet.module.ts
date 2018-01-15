import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../common/common.module";
import {WalletComponent} from "./wallet.component";
import {CreateWalletComponent} from "./create-wallet/create-wallet.component";
import {WritePhraseComponent} from "./write-phrase/write-phrase.component";
import {ImportWalletComponent} from "./import-wallet/import-wallet.component";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {WalletReceiveComponent} from "./wallet-receive/wallet-receive.component";
import {TransactionsWalletComponent} from './transactions-wallet/transactions-wallet.component';
import {TransactionService} from "../services/transaction.service";
import {HttpModule} from "@angular/http";
import {QuoteEffect} from "../effects/quote.effect";
import {EffectsModule} from "@ngrx/effects";
import {QuoteService} from "../services/quote.service";
import {TransactionEffect} from "../effects/transaction.effect";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {path: "", component: WalletComponent},
      {path: "create", component: CreateWalletComponent},
      {path: "write", component: WritePhraseComponent},
      {path: "import", component: ImportWalletComponent}
    ]),
    HttpModule,
    MatProgressSpinnerModule,
    ShapeShiftCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    EffectsModule.forFeature([
      QuoteEffect,
      TransactionEffect
    ]),
  ],
  declarations: [
    WalletComponent,
    CreateWalletComponent,
    WritePhraseComponent,
    ImportWalletComponent,
    WalletReceiveComponent,
    TransactionsWalletComponent,
  ],
  providers: [
    TransactionService,
    QuoteService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class WalletModule {
  constructor() {
    console.log("wallet", performance.now());
  }
}
