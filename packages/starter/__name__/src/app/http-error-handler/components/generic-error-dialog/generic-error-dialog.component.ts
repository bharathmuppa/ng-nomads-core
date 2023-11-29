import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorData } from '../../model/error.model';

@Component({
  selector: 'iam-parallel-update-error-dialog',
  templateUrl: './generic-error-dialog.component.html',
  styleUrls: ['./generic-error-dialog.component.scss'],
})
export class GenericErrorDialogComponent {
  public errorData?: ErrorData;

  constructor(
    private dialogRef: MatDialogRef<GenericErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ErrorData,
    private ngZone: NgZone,
  ) {
    this.dialogRef.updateSize('47.5rem');
    this.errorData = data;
    if (this.errorData && !this.errorData.subTitle) {
      this.errorData.subTitle = 'This Dynamic Impact Analysis has been updated';
    }
  }

  closeDialog(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(false);
    });
  }

  refreshData(): void {
    this.ngZone.run(() => {
      this.dialogRef.close(true);
    });
  }
}
