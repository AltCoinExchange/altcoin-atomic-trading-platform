import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";

export const ROUTES: Routes = [
  {
    path: "", component: AppComponent, children: [
    {
      path: "", loadChildren: "app/swap/swap.module#SwapModule",
    },
    {
      path: "wallet", loadChildren: "app/wallet/wallet.module#WalletModule"
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
