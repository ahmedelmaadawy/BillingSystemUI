import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('Token');
  const clonedRequest = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;
  const router = inject(Router);

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // If the response is 401 Unauthorized, navigate to the login page
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
