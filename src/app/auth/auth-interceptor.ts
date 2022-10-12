import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {TokenStorageService} from './token-storage.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 403) {
      localStorage.clear();
      window.location.replace('/auth/acces-refuse');
      return of(err.message);
    }
     return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
    }
    //return next.handle(authReq);
    return next.handle(authReq).pipe(catchError(x => this.handleAuthError(x)));
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
