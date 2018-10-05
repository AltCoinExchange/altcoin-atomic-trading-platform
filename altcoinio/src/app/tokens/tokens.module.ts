import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TokenPreviewComponent} from "./token-preview/token-preview.component";
import {TokenListComponent} from "./token-list/token-list.component";
import {AltcoinIoCommonModule} from "../common/common.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {QuoteService} from "../services/quote.service";
import {MatButtonToggleModule} from "@angular/material";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AltcoinIoCommonModule,
    FlexLayoutModule,
    NgxChartsModule,
    MatButtonToggleModule,
    FormsModule
  ],
  declarations: [
    TokenPreviewComponent,
    TokenListComponent,
  ],
  exports: [
    TokenListComponent,
  ],
  providers: [
    QuoteService
  ],
})
export class TokensModule {
}
