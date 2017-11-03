import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatSidenavModule, MatStepperModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
