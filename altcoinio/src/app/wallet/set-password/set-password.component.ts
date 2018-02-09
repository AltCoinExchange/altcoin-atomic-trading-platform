import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {scaleInOutAnimation} from "../../animations/animations";
import {RC4} from "../../common/rc4";

@Component({
  selector: "app-set-password",
  templateUrl: "./set-password.component.html",
  styleUrls: ["./set-password.component.scss"],
  animations: [scaleInOutAnimation]
})
export class SetPasswordComponent implements OnInit {

  scaleInOut = "scaleInOut";
  passwordCardVisible = true;

  pw;
  pwRepeat;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  submitPassword() {
    const encPassword = RC4.encDec(this.pw, this.pw);
    localStorage.setItem("PW", encPassword);
    this.changeCard();
  }

//   skip() {
//     localStorage.setItem("PW", "KLJUC");
//     this.changeCard();
//   }

  private changeCard() {
    this.passwordCardVisible = false;
    setTimeout(() => {
      this.router.navigate(['/wallet/create']);
    }, 1500);
  }
}
