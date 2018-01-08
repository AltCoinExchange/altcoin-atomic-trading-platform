import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {RC4} from "../../common/rc4";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

@Component({
  selector: "app-logout-dialog",
  templateUrl: "./logout-dialog.component.html",
  styleUrls: ["./logout-dialog.component.scss"]
})
export class LogoutDialogComponent implements OnInit {
  password = "";
  confirmPassword;

  dumpedResult;

  hadPassword;

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {
  }

  ngOnInit() {
    const encPw = localStorage.getItem("PW");
    this.hadPassword = encPw !== "KLJUC";
  }

  dumpPrivateKey() {
    const encPw = localStorage.getItem("PW");
    if (this.password === "" && !this.hadPassword) {
      this.dumpedResult = ShapeshiftStorage.get("btcprivkey");
      return;
    }

    const result = RC4.encDec(this.password, encPw);

    if (result === this.password) {
      this.dumpedResult = ShapeshiftStorage.get("btcprivkey");
    }
  }

  deleteAcc() {
    const encPw = localStorage.getItem("PW");
    const result = RC4.encDec(this.confirmPassword, encPw);
    if (result === this.confirmPassword) {
      this.dialogRef.close(true)
    }
  }
}
