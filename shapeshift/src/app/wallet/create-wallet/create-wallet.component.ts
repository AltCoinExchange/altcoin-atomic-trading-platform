import {Component, OnInit} from "@angular/core";
import {Go} from "../../actions/router.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {scaleInOutAnimation} from "../../animations/animations";
import {RC4} from "../../common/rc4";

@Component({
  selector: "app-create-wallet",
  templateUrl: "./create-wallet.component.html",
  styleUrls: ["./create-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class CreateWalletComponent implements OnInit {

  scaleInOut = "scaleInOut";
  passwordCardVisible = true;
  cardVisible = false;

  pw;
  pwRepeat;

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

  submitPassword() {
    const encPassword = RC4.encDec(this.pw, this.pw);
    localStorage.setItem("PW", encPassword);
    this.changeCard();
  }

  skip() {
    localStorage.setItem("PW", "KLJUC");
    this.changeCard();
  }

  private changeCard() {
    this.passwordCardVisible = false;
    setTimeout(() => {
      this.cardVisible = true;
    }, 1000);
  }
}
