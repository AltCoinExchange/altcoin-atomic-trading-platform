import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';
import * as swapAction from '../../actions/start.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation, fadeInAnimation } from '../../animations/animations';
import { MessageTypes } from '../../models/message-types.enum';

@Component({
  selector: 'app-transfer-link',
  templateUrl: './transfer-link.component.html',
  styleUrls: ['./transfer-link.component.scss'],
  animations: [flyInOutAnimation, fadeInAnimation],
})
export class TransferLinkComponent extends AnimationEnabledComponent implements OnInit {
  $link: Observable<string>;

  linkCopied: boolean;
  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;

  constructor(private store: Store<fromSwap.State>, private router: Router) {
    super();
    this.linkCopied = false;
    this.$link = this.store.select(swapSelector.getLink);
    this.makeInfoMessage();
  }

  copyLink(event){
    var copyText = <HTMLInputElement>document.getElementById("inputLink");
    copyText.select();
    document.execCommand("Copy");
    this.linkCopied = true;
    this.goToSwapComplete();
  }

  goToSwapComplete(){
    setTimeout(() => {
      this.formFlyOut();
      setTimeout(() => {
        this.store.dispatch(new swapAction.SetActiveStepAction(3));
        this.router.navigate(['/complete']);
      }, 500);
    }, 1000);
  }

  makeInfoMessage(){
    this.infoMsg = "Please keep your computer turned on and your internet connection active in order for Atomic Swap to succeed or it will be reverted.";
  }

  ngOnInit() {
  }

}
