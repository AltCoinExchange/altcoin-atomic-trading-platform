import {Component, HostBinding, OnInit} from '@angular/core';
import {flyInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  animations: [flyInOutAnimation],
})
export class QrCodeComponent implements OnInit {
  @HostBinding('@flyInOut') state = 'in';
  @HostBinding('style.display') display = 'block';
  @HostBinding('class') classes = 'swap';

  constructor() {
  }

  ngOnInit() {
  }

}
