import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TokenPreviewComponent} from "./token-preview/token-preview.component";
import {TokenListComponent} from "./token-list/token-list.component";
import {AltcoinIoCommonModule} from "../common/common.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    AltcoinIoCommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    TokenPreviewComponent,
    TokenListComponent,
  ],
  exports: [
    TokenListComponent,
  ]
})
export class TokensModule {
}
