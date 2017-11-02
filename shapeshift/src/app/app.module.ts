import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatSidenavModule, MatStepperModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ROUTES } from './app.routes';
import '../styles/styles.scss';

import { SwapComponent } from './swap';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    SwapComponent
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
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
