import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";

export const ROUTES: Routes = [
  {
    path: "", component: AppComponent, children: [
    {
      path: "wallet/empty", loadChildren: "app/wallet/empty-wallet/empty-wallet.module#EmptyWalletModule", data: {preload: true}
    },
    {
      path: "", loadChildren: "app/core-app.module#CoreAppModule", data: {preload: true}
    },
    {
      path: "links", loadChildren: "app/links/links.module#LinksModule"
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
