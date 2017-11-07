import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatSidenavModule, MatStepperModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {RouterStateSerializer, StoreRouterConnectingModule,} from '@ngrx/router-store';
import {CustomRouterStateSerializer} from './common/util';
import {metaReducers} from './reducers/index';
import {reducers} from './reducers/reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SwapEffect} from './effects/swap.effect';
import {RouterEffects} from './effects/router.effect';
import {LinkService} from './services/link.service';
import {SwapService} from './services/swap.service';
import {QuoteService} from './services/quote.service';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatStepperModule,
    MatCheckboxModule,
    AppRoutingModule,
    HttpModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      SwapEffect,
      RouterEffects,
    ]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    LinkService,
    SwapService,
    QuoteService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
