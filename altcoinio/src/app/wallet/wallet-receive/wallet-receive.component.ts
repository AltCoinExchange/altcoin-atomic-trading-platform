import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {Coins} from "../../models/coins/coins.enum";

declare const QRCode;

@Component({
  selector: "app-wallet-receive",
  templateUrl: "./wallet-receive.component.html",
  styleUrls: ["./wallet-receive.component.scss"]
})
export class WalletReceiveComponent implements OnInit {
  @ViewChild('qrcode') qrcodeElement; 
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
    
  }

  ngAfterViewInit(){
    this.generateQrCode();
  }

  copyReceiveAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById("coinAddress");
    copyText.select();
    document.execCommand("Copy");
  }

  private generateQrCode() {
    if (!this.qr && !!this.qrcodeElement.nativeElement) {
      this.qr = new QRCode(this.qrcodeElement.nativeElement, {
        text: "bitcoin:" + this.address,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
    
    if(this.qr && this.address){
      let addr;
      if (this._coin.type === Coins.BTC) {
        addr = "bitcoin:" + this.address;
      } else {
        addr = "ethereum:" + this.address;
      }
      this.qr.makeCode(addr);
    }
    
  }
}
