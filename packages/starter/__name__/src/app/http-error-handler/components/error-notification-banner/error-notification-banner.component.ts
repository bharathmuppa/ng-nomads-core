import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStore, MiraiError} from "../../../store/app-store.model";
import {currentErrors} from "../../../store/app.selectors";
import {uniqBy} from "lodash";
import {removeErrorMessages} from "../../../store/app.actions";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'iam-error-notification-banner',
  templateUrl: './error-notification-banner.component.html',
  styleUrls: ['./error-notification-banner.component.scss']
})
export class ErrorNotificationBannerComponent implements OnInit {

  public errors?: MiraiError[] =[];
  public uniqueErrors?: MiraiError[]=[];

  constructor(public dialogRef: MatDialogRef<ErrorNotificationBannerComponent>, private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.select(currentErrors).subscribe({
      next: errors => {
        this.errors = errors?.filter((error: MiraiError) => error?.severity === 2);
        this.uniqueErrors = uniqBy(this.errors, 'message');
      }
    })
  }

  closeBanner() {
    this.dialogRef.close(true);
    this.store.dispatch(removeErrorMessages({errors: this.errors ?? []}));
  }
}
