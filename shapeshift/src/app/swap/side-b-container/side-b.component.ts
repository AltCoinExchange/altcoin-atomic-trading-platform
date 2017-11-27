import {Component, OnInit} from "@angular/core";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";

@Component({
  selector: "app-side-b",
  templateUrl: "./side-b.component.html",
  animations: [flyInOutAnimation, fadeInAnimation],
})
export class SideBContainerComponent extends AnimationEnabledComponent implements OnInit {


  ngOnInit(): void {
  }
}
