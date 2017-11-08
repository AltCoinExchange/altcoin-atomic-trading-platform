import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';
import * as swapAction from '../../actions/start.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AnimationEnabledComponent} from '../../common/animation.component';
import {flyInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-transfer-link',
  templateUrl: './transfer-link.component.html',
  styleUrls: ['./transfer-link.component.scss'],
  animations: [flyInOutAnimation],
})
export class TransferLinkComponent extends AnimationEnabledComponent implements OnInit {
  $link: Observable<string>;

  linkCopied: boolean;

  constructor(private store: Store<fromSwap.State>, private router: Router,) {
    super();
    this.linkCopied = false;
    this.$link = this.store.select(swapSelector.getLink);
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
    }, 500);
  }

  ngOnInit() {
  }

}
