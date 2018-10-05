import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-altcoinio-button',
  templateUrl: './altcoinio-button.component.html',
  styleUrls: ['./altcoinio-button.component.scss'],
})
export class AltcoinioButtonComponent implements OnInit {
  @Input() disabled = false;
  constructor() {
  }

  ngOnInit() {
  }

}
