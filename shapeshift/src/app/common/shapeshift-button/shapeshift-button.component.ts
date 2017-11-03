import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shapeshift-button',
  templateUrl: './shapeshift-button.component.html',
  styleUrls: ['./shapeshift-button.component.scss'],
})
export class ShapeshiftButtonComponent implements OnInit {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
