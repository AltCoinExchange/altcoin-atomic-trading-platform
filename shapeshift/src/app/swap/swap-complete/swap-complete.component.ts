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

  @Input() status: any;
  

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    super();
   
  }

  ngOnInit() {
  }
}
