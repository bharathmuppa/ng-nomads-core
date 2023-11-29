import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStore, MiraiError} from "../../../store/app-store.model";
import {currentErrors} from "../../../store/app.selectors";
import {MAT_SNACK_BAR_DATA, MatSnackBar} from "@angular/material/snack-bar";
import {uniqBy} from "lodash";
import {removeErrorMessages} from "../../../store/app.actions";

@Component({
  selector: 'iam-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {
  public errors: MiraiError[] = [];
  public uniqueErrors: MiraiError[] = [];

  constructor(private store: Store<AppStore>, public snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public snackData: any) {
  }

  ngOnInit() {
    this.store.select(currentErrors).subscribe({
      next: errors => {
        if (this.snackData?.duration) {
          this.errors = errors?.filter((error: any) => error?.severity === 4) ?? [];
        } else {
          this.errors = errors?.filter((error: any) => error?.severity === 3) ?? [];
        }
        this.uniqueErrors = uniqBy(this.errors, 'message');

        // dismiss snack bar in case there are no related errors
        if (!this.errors || this.errors?.length === 0) {
          this.snackBar.dismiss();
        }
      }
    })
  }

  closeSnackBar() {
    this.store.dispatch(removeErrorMessages({errors: this.errors ?? []}));
    this.snackBar.dismiss();
  }
}
