import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {environment} from "../../../environments/environment";

/**
 * Interceptor to add Authorization Header in Development.
 * This is very specific to Our Projects
 * In Development, token will be sent via auth header. Environment file holds the secret
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;
    authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + environment.secret)
    });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }));

  }

}
