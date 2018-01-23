import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {Observable} from "rxjs/Observable";
import {ChartModel, ChartSerie} from "../../models/chart-model";
// import {QuoteService} from "../../services/quote.service";



@Component({
  selector: 'app-token-preview',
  templateUrl: './token-preview.component.html',
  styleUrls: ['./token-preview.component.scss']
})
export class TokenPreviewComponent implements OnInit {
  @Input() token;

  contentLoaded = false;

  public multi: Observable<ChartModel[]> = Observable.of([{ name: "PRICE", series: [ { name: new Date(), value: 1 }]}]);

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
    domain: ['#B2DFDB', '#4DB6AC', '#009688', '#AAAAAA']
  };

  constructor(public quoteService: QuoteService, private cd: ChangeDetectorRef) {
    const charts = this.quoteService.getHistory("BTC").map(e => {
      let chart: ChartModel[] = [];
      chart.push(TokenPreviewComponent.parseMap(e, "PRICE", "price"));
      chart.push(TokenPreviewComponent.parseMap(e, "MARKET CAP", "market_cap"));
      chart.push(TokenPreviewComponent.parseMap(e, "VOLUME", "volume"));
      return chart;
    });

    Object.assign(this.multi, charts);
  }

  ngOnInit() {

  }

  ngAfterViewChecked(){
    this.contentLoaded = true;
  }

  public static parseMap(obj: any, label: string, field: string): ChartModel {
    let priceModel = {} as ChartModel;
    priceModel.name = label;

    priceModel.series = obj[field].map(price => {
      let serie = {} as ChartSerie;
      serie.name = new Date(price[0]);
      serie.value = price[1];
      return serie;
    });

    return priceModel;
  }

  onSelect(event) {
    console.log(event);
  }
}
