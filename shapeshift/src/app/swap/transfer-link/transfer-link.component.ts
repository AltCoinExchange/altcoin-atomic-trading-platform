import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";
import {Go} from "../../actions/router.action";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {MessageTypes} from "../../models/message-types.enum";
import * as fromSwap from "../../reducers/start.reducer";
import * as sideASelector from "../../selectors/side-a.selector";
import * as swapAction from "../../actions/start.action";
import {CoinFactory} from "../../models/coins/coin.model";
import {Coins} from "../../models/coins/coins.enum";
import {InitiateAction} from "../../actions/side-B.action";

@Component({
  selector: "app-transfer-link",
  templateUrl: "./transfer-link.component.html",
  styleUrls: ["./transfer-link.component.scss"],
  animations: [flyInOutAnimation],
})
export class TransferLinkComponent extends AnimationEnabledComponent implements OnInit {
  $link: Observable<any>;

  linkCopied: boolean;
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;

  url = environment.url;

  constructor(private store: Store<fromSwap.State>) {
    super();
    this.store.dispatch(new swapAction.SetActiveStepAction(2));
    this.linkCopied = false;
    this.$link = this.store.select(sideASelector.getSwapLink);
    this.makeInfoMessage();

    this.$link.delay(3000).subscribe(r => {
      console.log(r);
      if (r.side === "b") {
        const receiveCoin = CoinFactory.createCoin(<any>Coins[r.to]);
        const depositCoin = CoinFactory.createCoin(<any>Coins[r.from]);
        const receiveAmount = r.receiveAmount;
        const depositAmount = r.depositAmount;
        const address = r.address;
        receiveCoin.amount = receiveAmount;
        depositCoin.amount = depositAmount;

        this.store.dispatch(new InitiateAction(
          {
            address,
            amount: receiveCoin.amount,
            link: r,
            coin: receiveCoin,
            depositCoin: depositCoin,
          },
        ));
        return;
      }
      // this.receiveCoin = CoinFactory.createCoin(Coins[data.receiveCoin]);
      // this.receiveCoin.amount = data.receiveAmount;
      // this.depositCoin = CoinFactory.createCoin(Coins[data.depositCoin]);
      // this.depositCoin.amount = data.depositAmount;
      // this.address = data.address;

      this.goToSwapAComplete();
    });
  }

  copyLink(event) {
    const copyText = <HTMLInputElement>document.getElementById("inputLink");
    copyText.select();
    document.execCommand("Copy");
    this.linkCopied = true;
    this.goToSwapAComplete();
  }

  goToSwapAComplete() {
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {
        this.store.dispatch(new Go({
          path: ["/a/complete"],
        }));
      }, 500);
    }, 1000);
  }

  goToSwapBComplete() {
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {
        this.store.dispatch(new Go({
          path: ["/b/complete"],
        }));
      }, 500);
    }, 1000);
  }

  makeInfoMessage() {
    this.infoMsg = "Please keep your computer turned on and your internet connection " +
      "active in order for Atomic Swap to succeed or it will be reverted.";
  }

  ngOnInit() {
  }

}
