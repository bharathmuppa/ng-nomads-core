import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

/**
 * Interceptor to add Authorization Header in Production.
 * This is very specific to Our Projects
 * In production, token will be handled by session cookies,  so no need of auth header
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

}
