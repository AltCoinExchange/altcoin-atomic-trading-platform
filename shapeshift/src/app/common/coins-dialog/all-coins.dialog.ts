import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import {Coins} from "../../models/coins/coins.enum";

@Component({
  selector: 'app-all-coins-dialog',
  templateUrl: './all-coins.dialog.html',
  styleUrls: ['./all-coins.dialog.scss'],
})
export class AllCoinsDialogComponent {

  Coins = Coins;

  constructor(public dialogRef: MatDialogRef<AllCoinsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
    if(!this.isCoinDisabled(coin))
      this.dialogRef.close(coin)
  }
}
