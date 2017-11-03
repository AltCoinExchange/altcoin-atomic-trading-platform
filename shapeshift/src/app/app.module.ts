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
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
