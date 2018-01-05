import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
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

@Component({
  selector: "app-transfer-link",
  templateUrl: "./transfer-link.component.html",
  styleUrls: ["./transfer-link.component.scss"],
  animations: [flyInOutAnimation],
})
export class TransferLinkComponent extends AnimationEnabledComponent implements OnInit {
  $link: Observable<string>;

  linkCopied: boolean;
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;

  url = environment.url;

  constructor(private store: Store<fromSwap.State>, private router: Router) {
    super();
    this.store.dispatch(new swapAction.SetActiveStepAction(2));
    this.linkCopied = false;
    this.$link = this.store.select(sideASelector.getALink);
    this.makeInfoMessage();
  }

  copyLink(event) {
    const copyText = <HTMLInputElement>document.getElementById("inputLink");
    copyText.select();
    document.execCommand("Copy");
    this.linkCopied = true;
    this.goToSwapComplete();
  }

  goToSwapComplete() {
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {
        this.store.dispatch(new Go({
          path: ["/a/complete"],
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
