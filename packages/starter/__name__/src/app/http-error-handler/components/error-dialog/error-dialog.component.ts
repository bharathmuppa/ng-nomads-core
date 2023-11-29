import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStore, MiraiError} from "../../../store/app-store.model";
import {currentErrors} from "../../../store/app.selectors";
import {uniqBy} from "lodash";
import {MatDialogRef} from '@angular/material/dialog';
import {removeErrorMessages} from "../../../store/app.actions";

@Component({
  selector: 'iam-error-handler',
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialogComponent implements OnInit {
  public errors?: MiraiError[] = [];
  public uniqueErrors?: MiraiError[] = [];

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.select(currentErrors).subscribe({
      next: errors => {
        this.errors = errors?.filter((error: any) => error?.severity === 1);
        this.uniqueErrors = uniqBy(this.errors, 'message');
      }
    })
  }

  closeDialog() {
    this.store.dispatch(removeErrorMessages({errors: this.errors ?? []}));
    this.dialogRef.close(true);
  }
}
