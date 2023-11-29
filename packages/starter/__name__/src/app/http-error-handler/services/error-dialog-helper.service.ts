import { Injectable, NgZone } from '@angular/core';
import { AppStore } from '../../store/app-store.model';
import { GenericErrorDialogComponent } from '../components/generic-error-dialog/generic-error-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { openRightDrawer, refreshDataAfterParallelUpdateError, setSelectedPartsAndLabels } from '../../store/app.actions';
import { Store } from '@ngrx/store';
import { ErrorData } from '../model/error.model';
import { MatDialogNavigationConfirmationComponent } from '../../shared/components/mat-dialog-navigation-confirmation/mat-dialog-navigation-confirmation.component';
import { updateCommentViewType } from '../../store/comments/comment.actions';
import { COMMENT_VIEW_TYPES } from '../../shared/enum/CommentViewTypes.enum';
import { RightDrawerModeTypes } from '../../right-drawer/model/right-drawer-mode.model.ts';
import { CommentService } from '@ng-nomads-angular/comment';
import { AuthorizationErrorDialogComponent } from '../components/authorization-error-dialog/authorization-error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogHelperService {
  dialogRef: MatDialogRef<GenericErrorDialogComponent> | undefined;

  constructor(
    private matDialog: MatDialog,
    private store: Store<AppStore>,
    private ngZone: NgZone,
    private commentService: CommentService,
  ) {}

  openParallelUpdateDialogWithRefreshAction(data: ErrorData) {
    this.ngZone.run(() => {
      if (this.dialogRef) {
        return;
      }
      this.dialogRef = this.matDialog.open(GenericErrorDialogComponent, {
        data: data,
      });
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((data) => {
          if (data) {
            this.dialogRef = undefined;
            this.store.dispatch(setSelectedPartsAndLabels({ selectedLabels: undefined, selectedParts: undefined }));
            this.store.dispatch(refreshDataAfterParallelUpdateError({ refreshData: true }));
          }
        });
    });
  }

  openParallelUpdateDialogWithAction(data: ErrorData): Observable<any> {
    let dialogRef: MatDialogRef<GenericErrorDialogComponent>;
    dialogRef = this.matDialog.open(GenericErrorDialogComponent, {
      data: data,
    });
    return dialogRef.afterClosed();
  }

  openConfirmationDialog() {
    if (this.matDialog.openDialogs.length === 0) {
      const message = 'Your changes have not been saved. Are you sure you want to leave this page?';
      let dialogRef: MatDialogRef<MatDialogNavigationConfirmationComponent>;
      dialogRef = this.matDialog.open(MatDialogNavigationConfirmationComponent, {
        width: '50rem',
        data: {
          isCaseObject: false,
          message: message,
        },
      });
      dialogRef.afterClosed().subscribe((confirm) => {
        if (confirm) {
          this.commentService.formDataChangesSubscription.next('');
          this.store.dispatch(updateCommentViewType({ viewType: COMMENT_VIEW_TYPES.CLOSE }));
        } else {
          this.store.dispatch(openRightDrawer({ mode: RightDrawerModeTypes.OVERLAY }));
        }
      });
    }
  }

  openUnauthorizedUserDialog() {
    this.matDialog.open(AuthorizationErrorDialogComponent, {
      data: {
        errorType: 'authorization',
      },
    });
  }
}
