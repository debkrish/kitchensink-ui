// auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../shared/components/toast/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

return next.handle(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (!authReq.url.includes('/auth/login')) {
          this.auth.logout();
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          this.toast.show('Session expired. Please login again.', 'error');
        }
      } else if (error.status === 403) {
        this.toast.show('You are not authorized to access this resource.', 'error');
        this.router.navigate(['/login']);
      } else if (error.status >= 500) {
        this.toast.show('Server error. Please try again later.', 'error');
      }
      return throwError(() => error);
    })
  );
  }
}
