import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {AuthService} from "./services";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  isRefreshing = false;

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authenticated = this.authService.isAuthenticated();

    if (authenticated) {
      request = this.addToken(request, this.authService.getAccessToken());
    }
    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp && resp.error && resp.status === 401) {
          return this.handle401Error(request, next)
        }
        return throwError(() => resp);
      })
    );
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    let refreshToken = this.authService.getRefreshToken();

    if (refreshToken && !this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refresh(refreshToken).pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, token.access));
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authService.deleteTokens();
          this.dialog.closeAll();
          this.router.navigate(['/login']);
          return throwError(() => new Error('token invalid or expired'));
        })
      )
    }
  }
}
