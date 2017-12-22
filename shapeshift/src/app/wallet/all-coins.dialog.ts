import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-all-coins-dialog',
  templateUrl: './all-coins.dialog.html'
})
export class AllCoinsDialogComponent {

  constructor(public dialogRef: MatDialogRef<AllCoinsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
