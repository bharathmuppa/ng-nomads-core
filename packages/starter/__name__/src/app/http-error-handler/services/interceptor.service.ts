import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {Store} from '@ngrx/store';
import {AppStore} from "../../store/app-store.model";
import {addErrorMessage} from "../../store/app.actions";
import {IAMErrorsService} from "./errors.service";

export const PARALLEL_UPDATE_ERROR_CODE: string = 'IAM-EXCEPTION-006';
export const DUPLICATE_PART_ERROR_CODE: string = "IAM-EXCEPTION-007";
export const UNAUTHORIZED_USER: string = "IAM-EXCEPTION-008";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  private durationInSeconds: number = 10;
  private isDialogOpened = false;
  private isBannerOpened = false;
  private isSnackbarOpened = false;

  constructor(private store: Store<AppStore>, private iamErrorService: IAMErrorsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();

    return next.handle(request).pipe(
      catchError((event: HttpErrorResponse) => {
          if (event?.error?.severity && event?.error?.application_status_code == UNAUTHORIZED_USER) {
              this.iamErrorService.openUnauthorizedUserDialog();
          } else if (event?.error?.severity && event?.error?.application_status_code !== DUPLICATE_PART_ERROR_CODE) {
              this.store.dispatch(addErrorMessage({error: event?.error}));
          }
          if (event?.error?.application_status_code === PARALLEL_UPDATE_ERROR_CODE && event?.error?.application_status_code !== DUPLICATE_PART_ERROR_CODE && event?.error?.severity !== 3) {
              this.iamErrorService.openParallelUpdateDialog(event?.error);
          } else if (event?.error?.application_status_code !== DUPLICATE_PART_ERROR_CODE && event?.error?.application_status_code != UNAUTHORIZED_USER) {
              this.setComponentBasedOnSeverity(event?.error);
          }

        return throwError(event?.error);
      }));

  }


  setComponentBasedOnSeverity(error:any){
    switch (error?.severity) {
      case 1:
        // in case of severity 1, we have to open error dialog
        if (!this.isDialogOpened) {
          this.isDialogOpened = true;
          this.iamErrorService.openErrorAsDialog(() => {
            this.isDialogOpened = false;
          });
        }
        break;
      case 2:
        //Opening the customised snackBar redirectedTo ErrorDialogComponent
        if (!this.isBannerOpened) {
          this.isBannerOpened = true;
          this.iamErrorService.openErrorsInBanner(() => {
            this.isBannerOpened = false;
          });
        }
        break;

      case 3:
        if (!this.isSnackbarOpened) {
          this.isSnackbarOpened = true;
          this.iamErrorService.showErrorsInSnackbar(() => {
            this.isSnackbarOpened = false;
          });
        }
        break;
      case 4:
      default:
        this.iamErrorService.showErrorsInSnackbar(() => {
          this.isSnackbarOpened = false;
        }, this.durationInSeconds * 1000);
        break;
    }
  }
}
