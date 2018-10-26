import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {TOKENS} from "altcoinio-wallet";
import {GetBtcBalanceAction, GetEthBalanceAction, GetTokenBalanceAction} from "../actions/balance.action";
import {scaleInOutAnimation} from "../animations/animations";
import {Coin, CoinFactory} from "../models/coins/coin.model";
import {Coins} from "../models/coins/coins.enum";
import {MessageTypes} from "../models/message-types.enum";
import {AppState} from "../reducers/app.state";
import {getBTCBalance, getETHBalance, getTokenBalances} from "../selectors/balance.selector";
import * as quoteSelector from "../selectors/quote.selector";
import {AllCoinsDialogComponent} from "../common/coins-dialog/all-coins.dialog";
import {AltcoinioStorage} from "../common/altcoinio-storage";
import {EthWallet} from "../models/wallets/eth-wallet";
import {Erc20CoinModel} from "../models/coins/erc20-coin.model";
import {BtcWallet} from "../models/wallets/btc-wallet";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
  animations: [scaleInOutAnimation]
})
export class WalletComponent implements OnInit, AfterViewInit {
  @ViewChild("perfectScrollbar") perfectScrollbar;
  scaleInOut = "scaleInOut";
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  Coins = Coins;
  allCoins: Array<Coin>;
  selectedCoin: Coin;
  sendAmount: Number = 0.00;
  randomValue = 0.001;
  elementType: "url";
  value = "Techiediaries";

  filteredCoins: Array<Coin>;
  search;

  inMyPossesion: boolean = localStorage.getItem("show_posession") ? localStorage.getItem("show_posession") === "true" : false;
  addressToSend;
  balanceToSend;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private router: Router) {
    this.allCoins = CoinFactory.createAllCoins();
    this.filteredCoins = [...this.allCoins];
    this.selectedCoin = this.allCoins[0];
  }

  ngOnInit() {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    if (!xprivKey) {
      this.router.navigate(["/wallet/empty"]);
    } else {
      this.infoMsg = "This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.";
      this.getTokenWalletRecords();
    }
  }

  ngAfterViewInit() {

  }

  selectCoinCard(coin) {
    this.selectedCoin = coin;
  }

  filterCoin(val: string) {
    val = val.toLowerCase();
    this.filteredCoins = [...this.allCoins].filter(coin => {
      return coin.name.toLowerCase().indexOf(val) !== -1 ||
        val.indexOf(coin.name.toLowerCase()) !== -1 ||
        coin.fullName.toLowerCase().indexOf(val) !== -1;
    });
  }

  showAllCoins(e) {
    e.preventDefault();
    e.stopPropagation();
    const dialogRef = this.dialog.open(AllCoinsDialogComponent, {
      panelClass: "all-coins-dialog",
      data: {coins: this.allCoins}
    });

    dialogRef.afterClosed().filter(res => !!res).subscribe(result => {
      if (result.walletRecord.balance === "0") {
        this.inMyPossesion = false;
        setTimeout(() => {
          this.selectCoinCard(result);
        });
      }
      this.selectCoinCard(result);
      const coinEl = document.querySelector("#" + result.name);
      if (!result || !coinEl) {
        return;
      }
      this.perfectScrollbar.directiveRef.scrollToX((<any>coinEl).offsetLeft - 50);

    });
  }

  onPossesionModeChange(val: boolean) {
    localStorage.setItem("show_posession", JSON.stringify(val));
    this.inMyPossesion = val;
  }

  wheelOverHorizontalDiv(e) {
    const perfectNativeElement = this.perfectScrollbar.directiveRef.elementRef.nativeElement;
    perfectNativeElement.scrollLeft -= (e.wheelDelta);
    e.preventDefault();
  }

  getTokenWalletRecords() {
    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GOLEM, name: "GNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.AUGUR, name: "REP"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ARAGON, name: "ANT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BAT, name: "BAT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EOS, name: "EOS"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GNOSIS, name: "GNO"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SALT, name: "SALT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.CIVIC, name: "CVC"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.OMISEGO, name: "OMG"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DISTRICT0X, name: "DNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STATUSNETWORK, name: "SNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SUBSTRATUM, name: "SUB"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TRON, name: "TRX"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BYTOM, name: "BTM"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DENT, name: "DENT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.POPULOUS, name: "PPT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.MAKER, name: "MKR"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DIGIXDAO, name: "DGD"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.QASH, name: "QASH"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ETHOS, name: "ETHOS"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.FUNFAIR, name: "FUN"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ZEROX, name: "ZRX"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.REQUESTNETWORK, name: "REQ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BANCOR, name: "BNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ICONOMI, name: "ICN"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TENXPAY, name: "PAY"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STORJ, name: "STORJ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ENJINCOIN, name: "ENJ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.MONACO, name: "MCO"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EDGELESS, name: "EDG"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.VECHAIN, name: "VET"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ICON, name: "ICX"}));

    this.allCoins.forEach((coin) => {
      switch (coin.name) {
        case "BTC":
          this.store.select(getBTCBalance).subscribe((walletRecord) => {
            coin.walletRecord = walletRecord;
          });
          break;
        case "ETH":
          this.store.select(getETHBalance).subscribe((walletRecord) => {
            coin.walletRecord = walletRecord;
          });
          break;
        default:
          this.store.select(getTokenBalances).subscribe((walletRecords) => {
            coin.walletRecord = walletRecords[coin.name];
          });
      }
      this.getTokenAmountUSD(coin);
    });
  }

  getTokenAmountUSD(coin) {
    const quotes = this.store.select(quoteSelector.getQuotes);
    coin.$balanceUSD = Observable.combineLatest(quotes, (q) => {
      if (!q || !coin.walletRecord) {
        return undefined;
      }
      const balance = Number(coin.walletRecord.balance);
      const coinQuote = q.get(coin.name);
      const number = balance * coinQuote.price;
      const price = +number.toFixed(2);
      if (isNaN(number)) {
        return 0;
      }
      return price;
    });
  }

  sendCoinsToAddress() {
    const ethWallet = new EthWallet();
    this.selectedCoin.faucetLoading = true;
    if (this.selectedCoin.type === Coins.ETH) {
      ethWallet.transferTo(this.addressToSend, this.balanceToSend).subscribe(r => {
        this.selectedCoin.faucetLoading = false;
      });
      return;
      // this.selectedCoin.walletRecord
    }

    if (this.selectedCoin.type === Coins.BTC) {
      const btcWallet = new BtcWallet();
      btcWallet.transferBalance(this.addressToSend, this.balanceToSend).subscribe(r => {
        this.selectedCoin.faucetLoading = false;
      });
      return;
    }

    // TODO -> everything else is ERC20 until we get BTC clones
    // TODO -> normally we ∂o not want to check Coin type, rather we will call same method e.g. transferTo like below

    this.selectedCoin.transferTo(this.addressToSend, ethWallet.toWei(this.balanceToSend, "ether")).subscribe(r => {
      this.selectedCoin.faucetLoading = false;
      const tokenBalancePayload = {token: (this.selectedCoin as Erc20CoinModel).token, name: this.selectedCoin.name};
      this.store.dispatch(new GetTokenBalanceAction(tokenBalancePayload));
      this.getTokenAmountUSD(this.selectedCoin);
    });
  }

  private getTokens(coin) {
    coin.faucetLoading = true;
    coin.getTokens().then(() => {
      coin.faucetLoading = false;
      this.getTokenWalletRecords();
    }, (error) => {
      coin.faucetLoading = false;
      console.log("error ", error );
    });
  }
}
