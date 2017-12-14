import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {TOKENS} from "../../../../wallet/src/eth-tokens/token-factory";
import {GetBtcBalanceAction, GetEthBalanceAction, GetTokenBalanceAction} from "../actions/balance.action";
import {fadeInOutAnimation, scaleInOutAnimation} from "../animations/animations";
import {MessageTypes} from "../models/message-types.enum";
import {AppState} from "../reducers/app.state";
import {WalletRecord} from "../reducers/balance.reducer";
import {
  getBTCBalance,
  getBtcLoading,
  getETHBalance,
  getEthLoading,
  getTokenBalanceAragon,
  getTokenBalanceAugur,
  getTokenBalanceBat,
  getTokenBalanceEos,
  getTokenBalanceGnosis,
  getTokenBalanceGolem,
  getTokenBalanceSalt,
  getTokenLoadingAragon,
  getTokenLoadingAugur,
  getTokenLoadingBat,
  getTokenLoadingEos,
  getTokenLoadingGnosis,
  getTokenLoadingGolem,
  getTokenLoadingSalt,
} from "../selectors/balance.selector";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
  animations: [scaleInOutAnimation, fadeInOutAnimation],
})
export class WalletComponent implements OnInit {
  scaleInOut = "scaleInOut";
  fadeInOut = "fadeInOut";
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  wallets: Array<any>;
  walletOptions: Array<any>;
  selectedWalletId: Number = 0;
  selectedOptionId: Number = 1;
  sendAmount: Number = 0.00;
  $ethLoading: Observable<boolean>;
  $btcLoading: Observable<boolean>;
  $tokenAugurLoading: Observable<boolean>;
  $tokenGolemLoading: Observable<boolean>;
  $tokenEosLoading: Observable<boolean>;
  $tokenSaltLoading: Observable<boolean>;
  $tokenBatLoading: Observable<boolean>;
  $tokenGnosisLoading: Observable<boolean>;
  $tokenAragonLoading: Observable<boolean>;
  $tokenBalanceAugur: Observable<WalletRecord>;
  $tokenBalanceGolem: Observable<WalletRecord>;
  $tokenBalanceAragon: Observable<WalletRecord>;
  $tokenBalanceEos: Observable<WalletRecord>;
  $tokenBalanceSalt: Observable<WalletRecord>;
  $tokenBalanceBat: Observable<WalletRecord>;
  $tokenBalanceGnosis: Observable<WalletRecord>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;

  constructor(private store: Store<AppState>) {
    this.infoMsg = "This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.";

    this.$btcLoading = this.store.select(getBtcLoading);
    this.$ethLoading = this.store.select(getEthLoading);
    this.$tokenAugurLoading = this.store.select(getTokenLoadingAugur);
    this.$tokenGolemLoading = this.store.select(getTokenLoadingGolem);
    this.$tokenAragonLoading = this.store.select(getTokenLoadingAragon);
    this.$tokenBatLoading = this.store.select(getTokenLoadingBat);
    this.$tokenEosLoading = this.store.select(getTokenLoadingEos);
    this.$tokenGnosisLoading = this.store.select(getTokenLoadingGnosis);
    this.$tokenSaltLoading = this.store.select(getTokenLoadingSalt);

    this.$ethBalance = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
    this.$tokenBalanceAugur = this.store.select(getTokenBalanceAugur);
    this.$tokenBalanceGolem = this.store.select(getTokenBalanceGolem);
    this.$tokenBalanceAragon = this.store.select(getTokenBalanceAragon);
    this.$tokenBalanceBat = this.store.select(getTokenBalanceBat);
    this.$tokenBalanceEos = this.store.select(getTokenBalanceEos);
    this.$tokenBalanceGnosis = this.store.select(getTokenBalanceGnosis);
    this.$tokenBalanceSalt = this.store.select(getTokenBalanceSalt);


    this.walletOptions = [{id: 0, name: "SEND"}, {id: 1, name: "RECEIVE"}, {id: 2, name: "TRANSACTIONS"}];
    this.wallets = [
      {
        id: 0,
        icon: "assets/icon/eth-icon-o.png",
        name: "ETH",
        fullName: "Ethereum",
        $balance: this.$ethBalance,
        usd: 0,
        $loading: this.$ethLoading,
      },
      {
        id: 1,
        icon: "assets/icon/btc-icon-o.png",
        name: "BTC",
        fullName: "Bitcoin",
        $balance: this.$btcBalance,
        usd: 0,
        $loading: this.$btcLoading,
      },
      {
        id: 2,
        icon: "assets/icon/ltc-icon-o.png",
        name: "LTC",
        fullName: "Litecoin",
        usd: 0,
        $loading: this.$ethLoading,
      },
      {id: 3, icon: "assets/icon/dcr-icon-o.png", name: "DCR", fullName: "Decred", usd: 0, $loading: this.$ethLoading},
      {
        id: 4,
        icon: "assets/icon/rep-icon-o.png",
        name: "REP",
        fullName: "Augur",
        $balance: this.$tokenBalanceAugur,
        usd: 0,
        $loading: this.$tokenAugurLoading,
      },
      {
        id: 5,
        icon: "assets/icon/gnt-icon-o.png",
        name: "GNT",
        fullName: "Golem",
        $balance: this.$tokenBalanceGolem,
        usd: 0,
        $loading: this.$tokenGolemLoading,
      },
      {
        id: 6,
        icon: "assets/icon/gno-icon-o.png",
        name: "GNO",
        fullName: "Gnosis",
        $balance: this.$tokenBalanceGnosis,
        usd: 0,
        $loading: this.$tokenGnosisLoading,
      },
      {
        id: 7,
        icon: "assets/icon/bat-icon-o.png",
        name: "BAT",
        fullName: "BAT",
        $balance: this.$tokenBalanceBat,
        usd: 0,
        $loading: this.$tokenBatLoading,
      },
      {
        id: 8,
        icon: "assets/icon/ant-icon-o.png",
        name: "ANT",
        fullName: "Aragon",
        $balance: this.$tokenBalanceAragon,
        usd: 0,
        $loading: this.$tokenAragonLoading,
      },
      {
        id: 9,
        icon: "assets/icon/eos-icon-o.png",
        name: "EOS",
        fullName: "EOS",
        $balance: this.$tokenBalanceEos,
        usd: 0,
        $loading: this.$tokenEosLoading,
      },
      {
        id: 10,
        icon: "assets/icon/salt-icon-o.png",
        name: "SALT",
        fullName: "SALT",
        $balance: this.$tokenBalanceSalt,
        usd: 0,
        $loading: this.$tokenSaltLoading,
      },
    ];
  }

  ngOnInit() {

    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());

    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.GOLEM, name: "golem" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.AUGUR, name: "augur" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.ARAGON, name: "aragon" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.BAT, name: "bat" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.EOS, name: "eos" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.GNOSIS, name: "gnosis" }));
    this.store.dispatch(new GetTokenBalanceAction({ token: TOKENS.SALT, name: "salt" }));

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

  selectWalletOption(walletOption) {
    this.selectedOptionId = walletOption.id;
  }

  selectWalletCard(event, wallet) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedWalletId = wallet.id;
  }

}
