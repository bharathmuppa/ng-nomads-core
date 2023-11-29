import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorizationData } from '../../model/error.model';

@Component({
  selector: 'iam-authorization-error-dialog',
  templateUrl: './authorization-error-dialog.component.html',
})
export class AuthorizationErrorDialogComponent {
  isAuthorized: boolean = false;
  isBrowserSupported: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AuthorizationErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AuthorizationData,
  ) {
    this.dialogRef.updateSize('47.5rem');
    this.isAuthorized = !(data && data.errorType === 'authorization');
    this.isBrowserSupported = !(data && data.errorType === 'browser');
  }
}
