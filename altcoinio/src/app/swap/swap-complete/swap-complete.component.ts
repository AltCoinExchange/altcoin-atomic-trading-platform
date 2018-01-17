import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {AppState} from "../../reducers/app.state";
import * as swapAction from "../../actions/start.action";

@Component({
  selector: "app-swap-complete",
  templateUrl: "./swap-complete.component.html",
  styleUrls: ["./swap-complete.component.scss"],
  animations: [flyInOutAnimation],
})
export class SwapCompleteComponent extends AnimationEnabledComponent implements OnInit {

  @Input() progress: any;
  

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    super();
    this.store.dispatch(new swapAction.SetActiveStepAction(3));
  }

  ngOnInit() {
  }
}
