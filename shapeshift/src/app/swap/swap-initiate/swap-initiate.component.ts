import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coin.model';
import {flyInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
  animations: [flyInOutAnimation],
})
export class SwapInitiateComponent implements OnInit {
  @HostBinding('@flyInOut') state = 'in';
  @HostBinding('style.display') display = 'block';
  @HostBinding('class') classes = 'swap';

  eth: Coin = {
    name: 'ETH',
    amount: 0,
    animationSwapState: 'slideBack',
    icon: 'assets/icon/eth-icon.png',
    iconOutline: 'assets/icon/eth-icon-o.png',
  };
  btc: Coin = {
    name: 'BTC',
    amount: 0,
    animationSwapState: 'slideBack',
    icon: 'assets/icon/btc-icon.png',
    iconOutline: 'assets/icon/btc-icon-o.png',
  };
  swapProcess: SwapProcess = {
    depositCoin: this.eth,
    receiveCoin: this.btc,
    submitAmount: false,
    showQRCode: false,
    showLink: false,
  };
  firstSpinner = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  doSubmit() {
    this.state = 'void';
    setTimeout(() => {
      this.router.navigate(['/insufficient-amount']);
    }, 500);
  }

  swapDepositRecieveCoins() {
    const temp = this.swapProcess.depositCoin;
    this.swapProcess.depositCoin = this.swapProcess.receiveCoin;
    this.swapProcess.receiveCoin = temp;
  }

}
