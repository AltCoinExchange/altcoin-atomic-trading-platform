import { Component, OnInit } from '@angular/core';
import { Go } from "../../actions/router.action";
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.state';
import { scaleInOutAnimation } from '../../animations/animations'; 

@Component({
  selector: 'app-write-phrase',
  templateUrl: './write-phrase.component.html',
  styleUrls: ['./write-phrase.component.scss'],
  animations: [ scaleInOutAnimation ]
})
export class WritePhraseComponent implements OnInit {

  scaleInOut = 'scaleInOut';
  cardVisible : boolean = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

}
