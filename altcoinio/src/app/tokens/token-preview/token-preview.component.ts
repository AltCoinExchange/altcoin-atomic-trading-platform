import {Component, OnInit, Input, ChangeDetectorRef, ViewChild} from '@angular/core';
import {QuoteService} from "../../services/quote.service";
import {Observable} from "rxjs/Observable";
import {ChartModel, ChartSerie} from "../../models/chart-model";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import * as quoteSelector from "../../selectors/quote.selector";
import * as swapSelector from "../../selectors/start.selector";
import {Coin} from "../../models/coins/coin.model";
import {BtcCoinModel} from "../../models/coins/btc-coin.model";
import {EthCoinModel} from "../../models/coins/eth-coin.model";
import {Coins} from "../../models/coins/coins.enum";
import * as swapAction from "../../actions/start.action";

@Component({
  selector: 'app-token-preview',
  templateUrl: './token-preview.component.html',
  styleUrls: ['./token-preview.component.scss']
})
export class TokenPreviewComponent implements OnInit {
  @Input() token;

  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  contentLoaded = false;
  chartMode = 'price';
  tokenPrice;
  tokenPerc;
  statsLoaded = false;

  public $charts: Observable<ChartModel[]>;
  public multi: ChartModel[] = [];

  // chart options
  public showXAxis = false;
  public scaleType = "linear";
  public showYAxis = false;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = false;
  public showYAxisLabel = false;

  public colorScheme = {
    domain: ['#B2DFDB', '#4DB6AC', '#009688', '#AAAAAA']
  };

  constructor(private store: Store<AppState>,public quoteService: QuoteService, private cd: ChangeDetectorRef) {
    this.$depositCoin = this.store.select(swapSelector.getDepositCoin);
    this.$receiveCoin = this.store.select(swapSelector.getReceiveCoin);
  }

  ngOnInit() {
    this.getCoinStats();
    this.getChartData();
    this.showPrice();
  }

  getChartData(){
    this.$charts = this.quoteService.getHistory(this.token.name, "30day").map(e => {
      let chart: ChartModel[] = [];
      chart.push(TokenPreviewComponent.parseMap(e, "PRICE", "price"));
      chart.push(TokenPreviewComponent.parseMap(e, "VOLUME", "volume"));
      chart.push(TokenPreviewComponent.parseMap(e, "MARKET CAP", "market_cap"));
      return chart;
    });
  }

  showPrice(){
    this.$charts.subscribe((data) => {
      this.multi = [];
      this.multi.push(data[0]);
      this.contentLoaded = true;
    });
  }

  showVolume(){
    this.$charts.subscribe((data) => {
      this.multi = [];
      this.multi.push(data[1]);
    });
  }

  showMarket(){
    this.$charts.subscribe((data) => {
      this.multi = [];
      this.multi.push(data[2]);
    });
  }

  getCoinStats(){
    const quotes = this.store.select(quoteSelector.getQuotes);
    quotes.subscribe((q) => {
      if(!!q){
        var coinStats = q.get(this.token.name);
        this.tokenPrice = coinStats.price;
        this.tokenPerc = coinStats.perc;
        this.statsLoaded = true;
      }
    });

    this.quoteService.getLiveQuotesObj().subscribe(e => {
      const token = e.find(i => i.short === this.token.name);
      if (token) {
        this.tokenPrice = token.price;
        this.tokenPerc = token.perc;
        this.statsLoaded = true;
      }
    });
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

  buyToken(){
    try { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
    this.store.dispatch(new swapAction.setReceiveCoinAction(this.token));
    this.$depositCoin.subscribe((deposit) => {
      if(!(this.token.type == Coins.BTC || this.token.type == Coins.ETH) && !(deposit.type == Coins.BTC || deposit.type == Coins.ETH)){
        this.store.dispatch(new swapAction.setDepositCoinAction(new EthCoinModel()));
      }
    }).unsubscribe();

  }

  sellToken(){
    try { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
    this.store.dispatch(new swapAction.setDepositCoinAction(this.token));
    this.$receiveCoin.subscribe((receive) => {
      if(!(this.token.type == Coins.BTC || this.token.type == Coins.ETH) && !(receive.type == Coins.BTC || receive.type == Coins.ETH)){
        this.store.dispatch(new swapAction.setReceiveCoinAction(new EthCoinModel()));
      }
    }).unsubscribe();
  }
}
