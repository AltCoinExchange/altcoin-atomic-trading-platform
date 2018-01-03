import {Component, OnInit} from "@angular/core";
import {scaleInOutAnimation} from "../../animations/animations";
import {Go} from "../../actions/router.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";

@Component({
  selector: "app-empty-wallet",
  templateUrl: "./empty-wallet.component.html",
  styleUrls: ["./empty-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class EmptyWalletComponent implements OnInit {

  scaleInOut = "scaleInOut";
  cardVisible = true;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  createWallet() {
    this.cardVisible = false;
    setTimeout(() => {
      this.store.dispatch(new Go({
        path: ["/wallet/create"],
      }));
    }, 1500);
  }

  importWallet() {
    this.cardVisible = false;
    setTimeout(() => {
      this.store.dispatch(new Go({
        path: ["/wallet/import"],
      }));
    }, 1500);
  }

}
