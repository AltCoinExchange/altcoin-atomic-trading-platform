import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {StartComponent} from "./start/start.component";
import {MatSidenavModule, MatTabsModule} from "@angular/material";
import {PreloadAllModules, RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    RouterModule.forRoot([
      {
        path: "", loadChildren: "app/app.module#AppModule",
      }
    ], {preloadingStrategy: PreloadAllModules}),
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class StartModule {
}
