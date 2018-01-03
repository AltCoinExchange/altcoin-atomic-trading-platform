import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-shapeshift-button',
  templateUrl: './shapeshift-button.component.html',
  styleUrls: ['./shapeshift-button.component.scss'],
})
export class ShapeshiftButtonComponent implements OnInit {
  @Input() disabled = false;
  constructor() {
  }

  ngOnInit() {
  }

}
