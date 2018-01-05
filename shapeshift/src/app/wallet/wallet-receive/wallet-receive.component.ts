import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Coins} from "../../models/coins/coins.enum";

declare const QRCode;

@Component({
  selector: "app-wallet-receive",
  templateUrl: "./wallet-receive.component.html",
  styleUrls: ["./wallet-receive.component.scss"]
})
export class WalletReceiveComponent implements OnInit {
  @Input() address;
  _coin;
  qr;

  constructor() {
  }

  @Input()
  set coin(value) {
    this._coin = value;
    this.generateQrCode();
  }


  get coin() {
    return this._coin;
  }

  ngOnInit() {
    this.generateQrCode();
  }

  private generateQrCode() {
    const qrcodeElement = document.getElementById("qrcode");
    if (!this.qr && !!qrcodeElement) {
      this.qr = new QRCode(qrcodeElement, {
        text: "bitcoin:" + this.address,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
    let addr;
    if (this._coin.type === Coins.BTC) {
      addr = "bitcoin:" + this.address;
    } else {
      addr = "ethereum:" + this.address;
    }
    this.qr.makeCode(addr);
  }
}
