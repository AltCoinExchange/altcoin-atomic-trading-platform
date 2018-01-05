import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {EffectsModule} from "@ngrx/effects";

import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {CustomRouterStateSerializer} from "./common/util";
import {BalanceEffect} from "./effects/balance.effect";
import {RouterEffects} from "./effects/router.effect";
import {metaReducers} from "./reducers/index";
import {reducers} from "./reducers/reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([
      RouterEffects,
      BalanceEffect,
    ]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ]
})
export class AppModule {
}
