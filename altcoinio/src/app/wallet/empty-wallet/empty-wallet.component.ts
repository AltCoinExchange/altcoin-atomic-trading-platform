import {Component, OnInit} from "@angular/core";
import {scaleInOutAnimation} from "../../animations/animations";
import {Router} from "@angular/router";

@Component({
  selector: "app-empty-wallet",
  templateUrl: "./empty-wallet.component.html",
  styleUrls: ["./empty-wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class EmptyWalletComponent implements OnInit {

  scaleInOut = "scaleInOut";
  cardVisible = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  createWallet() {
    this.cardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/password']);
    }, 1500);
  }

  importWallet() {
    this.cardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/import']);
    }, 1500);
  }

}
