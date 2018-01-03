import {Component, OnInit} from "@angular/core";
import {Go} from "../../actions/router.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";

@Component({
  selector: "app-create-wallet",
  templateUrl: "./create-wallet.component.html",
  styleUrls: ["./create-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class CreateWalletComponent implements OnInit {

  scaleInOut = "scaleInOut";
  cardVisible = true;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  writePhrase() {
    this.cardVisible = false;
    setTimeout(() => {
      this.store.dispatch(new Go({
        path: ["/wallet/write"],
      }));
    }, 1500);
  }

}
