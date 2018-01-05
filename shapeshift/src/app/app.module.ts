import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MatCheckboxModule, MatSidenavModule, MatStepperModule, MatToolbarModule} from "@angular/material";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";

import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {CustomRouterStateSerializer} from "./common/util";
import {BalanceEffect} from "./effects/balance.effect";
import {QuoteEffect} from "./effects/quote.effect";
import {RouterEffects} from "./effects/router.effect";
import {SideAEffect} from "./effects/side-A.effect";
import {SideBEffect} from "./effects/side-B.effect";
import {metaReducers} from "./reducers/index";
import {reducers} from "./reducers/reducers";
import {LinkService} from "./services/link.service";
import {MoscaService} from "./services/mosca.service";
import {QuoteService} from "./services/quote.service";
import {TransactionService} from "./services/transaction.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatTabsModule,
    AppRoutingModule,
    HttpModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([
      RouterEffects,
      QuoteEffect,
      BalanceEffect,
      SideAEffect,
      SideBEffect
    ]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    LinkService,
    QuoteService,
    MoscaService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
