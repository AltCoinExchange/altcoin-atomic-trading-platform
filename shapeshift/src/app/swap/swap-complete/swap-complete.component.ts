import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {SwapSpinners} from "../../models/swap-spinners.enum";
import {AppState} from "../../reducers/app.state";

@Component({
  selector: "app-swap-complete",
  templateUrl: "./swap-complete.component.html",
  styleUrls: ["./swap-complete.component.scss"],
  animations: [flyInOutAnimation],
})
export class SwapCompleteComponent extends AnimationEnabledComponent implements OnInit {

  initiated: SwapSpinners;
  participated: SwapSpinners;
  redeeming: SwapSpinners;
  done: SwapSpinners;

  @Input() status: any;
  //
  swapSpinners: typeof SwapSpinners = SwapSpinners;
  //
  // $link: Observable<string>;
  //
  // $swapStatus: Observable<any>;
  // swapStatusSubscription: Subscription;
  //
  // $status;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    super();
    //
    // this.store.dispatch(new swapAction.SetActiveStepAction(3));
    // this.$link = this.store.select(getInitateLink);
    // this.$swapStatus = this.store.select(getSwapStatus);
    //
    // this.$status = this.store.select(getSwapStatus);
  }

  ngOnInit() {
    // this.$status.subscribe(r => {
    //   setTimeout(() => {
    //     this.cd.detectChanges();
    //   });
    // });
  }
}
