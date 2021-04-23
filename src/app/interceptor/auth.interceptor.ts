import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Authenticated } from '../models/authenticated.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUser: Authenticated = JSON.parse(sessionStorage.getItem('currentUser'));

    let request = req;

    if (currentUser) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
        } else if (err.status === 403) {
          this.authSvc.logout();
        }
        return throwError(err);
      })
    );
  }
}
