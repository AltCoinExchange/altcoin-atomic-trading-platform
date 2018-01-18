import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {SwapProgress} from "../../models/swap-progress.enum";

@Component({
  selector: "progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  SwapProgress = SwapProgress;
  @Input() progress: SwapProgress;

  constructor() {
  }

  ngOnInit() {
    console.log("progress is ", this.progress);
  }

}
