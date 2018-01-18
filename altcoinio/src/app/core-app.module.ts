import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EffectsModule} from "@ngrx/effects";
import {BalanceEffect} from "./effects/balance.effect";
import {AccountHelperService} from "./services/account-helper.service";

export const ROUTES: Routes = [
  {
    path: "", loadChildren: "app/swap/swap.module#SwapModule", data: {preload: true}
  },
  {
    path: "wallet", loadChildren: "app/wallet/wallet.module#WalletModule", data: {preload: true}
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    EffectsModule.forFeature([BalanceEffect])
  ],
  providers: [
    AccountHelperService,
  ]
})
export class CoreAppModule {
}
