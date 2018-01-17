import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";

import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {CustomRouterStateSerializer} from "./common/util";
import {RouterEffects} from "./effects/router.effect";
import {metaReducers} from "./reducers/index";
import {reducers} from "./reducers/reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([
      RouterEffects,
    ]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ]
})
export class AppModule {
  constructor() {
    console.log("app module", performance.now());
  }
}
