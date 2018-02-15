import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
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
  mode;

  pw;
  pwRepeat;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.mode = params.mode;
    });
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
      if(this.mode == 'create')
        this.router.navigate(['/wallet/create']);
      else if(this.mode == 'import')
        this.router.navigate(['/wallet/import']);
    }, 1500);
  }
}
