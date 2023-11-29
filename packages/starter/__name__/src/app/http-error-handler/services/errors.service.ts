import {Injectable} from "@angular/core";
import {ErrorDialogComponent} from "../components/error-dialog/error-dialog.component";
import {ErrorNotificationBannerComponent} from "../components/error-notification-banner/error-notification-banner.component";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorDialogHelperService} from "./error-dialog-helper.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    constructor(private matDialog: MatDialog, private snackBar: MatSnackBar,
                private errorDialogHelperService: ErrorDialogHelperService) {
    }

    openErrorAsDialog(onClose: () => void) {
        let dialog_box = this.matDialog.open(ErrorDialogComponent, {
            width: "500px",
            height: "auto",
            disableClose: true,
        });

        dialog_box.afterClosed().subscribe((_: any) => {
      onClose();
    })

  }

  openErrorsInBanner(onClose: () => void) {
    let dialog_box = this.matDialog.open(ErrorNotificationBannerComponent, {
      width: "40vw",
      height: "19vh",
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'error-banner',
      position: {
        top:'3.5rem'
      }
    });
    dialog_box.afterClosed().subscribe((_: any) => {
      onClose();
    })
  }

  showErrorsInSnackbar(onClose: () => void, duration?: number) {
    let snack = this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: {
        ...(duration && {duration})
      },
        panelClass: "severity-three",
        ...(duration && {duration})
    });

      snack.afterDismissed().subscribe(() => {
          onClose();
      })
  }

    openParallelUpdateDialog(error: any) {
        this.errorDialogHelperService.openParallelUpdateDialogWithRefreshAction({
            errorData: error,
            showReload: true,
            showConfirmAndContinue: false
        });
    }

    openUnauthorizedUserDialog() {
        this.errorDialogHelperService.openUnauthorizedUserDialog();
    }
}
