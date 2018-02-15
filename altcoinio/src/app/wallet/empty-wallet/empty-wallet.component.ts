import {Component, OnInit} from "@angular/core";
import {scaleInOutAnimation} from "../../animations/animations";
import {Router, NavigationExtras} from "@angular/router";

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
    let navigationExtras: NavigationExtras = {
        queryParams: {
            mode: 'create'
        }
    };
    this.cardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/password'], navigationExtras);
    }, 1500);
  }

  importWallet() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          mode: 'import'
      }
    };
    this.cardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/password'], navigationExtras);
    }, 1500);
  }

}
