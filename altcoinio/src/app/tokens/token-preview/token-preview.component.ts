import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-token-preview',
  templateUrl: './token-preview.component.html',
  styleUrls: ['./token-preview.component.scss']
})
export class TokenPreviewComponent implements OnInit {
  @Input() token;

  public single: any[];
  public multi: any[] = [
    {
      name: 'BTC',
      series: [
        {
          name: '1990',
          value: 0
        },
        {
          name: '2000',
          value: 1200
        },
        {
          name: '2010',
          value: 11000
        },
      ]
    }];

  public view: any[] = [200, 100];

  // options
  public showXAxis = false;
  public scaleType = "linear";
  public showYAxis = false;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = false;
  public xAxisLabel = 'Coin';
  public showYAxisLabel = false;
  public yAxisLabel = 'Price';

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }
}
