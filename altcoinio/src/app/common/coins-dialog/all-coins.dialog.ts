import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import {Coins} from "../../models/coins/coins.enum";
import {Coin } from "../../models/coins/coin.model";
@Component({
  selector: 'app-all-coins-dialog',
  templateUrl: './all-coins.dialog.html',
  styleUrls: ['./all-coins.dialog.scss'],
})
export class AllCoinsDialogComponent {

  filteredCoins: Array<Coin>;
  search;

  constructor(public dialogRef: MatDialogRef<AllCoinsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.filteredCoins = [...this.data.coins];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSelectedCoin(coin){
    return (this.data.selectedCoin && this.data.selectedCoin.type === coin.type)
  }

  isCoinDisabled(coin){
    return (this.data.disableOtherCoins && (coin.type !== Coins.BTC && coin.type !== Coins.ETH))
  }

  closeDialog(coin){
    // if(!this.isCoinDisabled(coin))
      this.dialogRef.close(coin)
  }

  filterCoin(val: string) {
    val = val.toLowerCase();
    this.filteredCoins = [...this.data.coins].filter(coin => {
      return coin.name.toLowerCase().indexOf(val) !== -1 ||
        val.indexOf(coin.name.toLowerCase()) !== -1 ||
        coin.fullName.toLowerCase().indexOf(val) !== -1;
    });
  }
}
