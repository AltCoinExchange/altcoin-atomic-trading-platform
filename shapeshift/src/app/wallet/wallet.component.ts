import {Component, OnInit, HostBinding} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {GetBtcBalanceAction, GetEthBalanceAction, GetRepBalanceAction} from "../actions/balance.action";
import {MessageTypes} from "../models/message-types.enum";
import {AppState} from "../reducers/app.state";
import {WalletRecord} from "../reducers/balance.reducer";
import {
  getBTCBalance, getBtcLoading, getETHBalance, getEthLoading, getREPBalance, getRepLoading,
} from "../selectors/balance.selector";
import {scaleInOutAnimation, fadeInOutAnimation} from "../animations/animations";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
  animations: [scaleInOutAnimation, fadeInOutAnimation]
})
export class WalletComponent implements OnInit {
  scaleInOut: string = 'scaleInOut';
  fadeInOut: string = 'fadeInOut';
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  wallets: Array<any>;
  walletOptions: Array<any>;
  selectedWalletId: Number = 0;
  selectedOptionId: Number = 1;
  sendAmount: Number = 0.00;
  $ethLoading: Observable<boolean>;
  $btcLoading: Observable<boolean>;
  $repLoading: Observable<boolean>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;
  $repBalance: Observable<WalletRecord>;

  constructor(private store: Store<AppState>) {
    this.infoMsg = "This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.";

    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());
    this.store.dispatch(new GetRepBalanceAction());

    this.$ethLoading = this.store.select(getEthLoading);
    this.$btcLoading = this.store.select(getBtcLoading);
    this.$repLoading = this.store.select(getRepLoading);

    this.$ethBalance = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
    this.$repBalance = this.store.select(getREPBalance);

    this.walletOptions = [{id: 0, name: 'SEND'},{ id: 1, name: 'RECEIVE'},{ id: 2, name: 'TRANSACTIONS'}];
    this.wallets=[
      { id: 0, icon: 'assets/icon/eth-icon-o.png', name: 'ETH', fullName: 'Ethereum' ,$balance: this.$ethBalance, usd: 0, $loading: this.$ethLoading },
      { id: 1, icon: 'assets/icon/btc-icon-o.png', name: 'BTC', fullName: 'Bitcoin', $balance: this.$btcBalance, usd: 0, $loading: this.$btcLoading },
      { id: 2, icon: 'assets/icon/ltc-icon-o.png', name: 'LTC', fullName: 'Litecoin', usd: 0, $loading: this.$ethLoading },
      { id: 3, icon: 'assets/icon/dcr-icon-o.png', name: 'DCR', fullName: 'Decred', usd: 0, $loading: this.$ethLoading },
      { id: 4, icon: 'assets/icon/rep-icon-o.png', name: 'REP', fullName: 'Augur', $balance: this.$repBalance, usd: 0, $loading: this.$repLoading },
      { id: 5, icon: 'assets/icon/gnt-icon-o.png', name: 'GNT', fullName: 'Golem', usd: 0, $loading: this.$ethLoading },
      { id: 6, icon: 'assets/icon/gno-icon-o.png', name: 'GNO', fullName: 'Gnosis', usd: 0, $loading: this.$ethLoading },
      { id: 7, icon: 'assets/icon/bat-icon-o.png', name: 'BAT', fullName: 'BAT', usd: 0, $loading: this.$ethLoading },
      { id: 8, icon: 'assets/icon/ant-icon-o.png', name: 'ANT', fullName: 'Aragon', usd: 0, $loading: this.$ethLoading },
      { id: 9, icon: 'assets/icon/eos-icon-o.png', name: 'EOS', fullName: 'EOS', usd: 0, $loading: this.$ethLoading },
      { id: 10, icon: 'assets/icon/salt-icon-o.png', name: 'SALT', fullName: 'SALT', usd: 0, $loading: this.$ethLoading },
    ];
  }

  ngOnInit() {

  }

  copyEthAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById("ethAddress");
    copyText.select();
    document.execCommand("Copy");
  }

  copyBtcAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById("btcAddress");
    copyText.select();
    document.execCommand("Copy");
  }

  selectWalletOption(walletOption){
    this.selectedOptionId = walletOption.id;
  }

  selectWalletCard(event, wallet){
    event.stopPropagation();
    event.preventDefault();
    this.selectedWalletId = wallet.id;
  }

}
