import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, filter, finalize, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((error: any) => {
        let errorMsg = '';
        if (error instanceof HttpErrorResponse && error.status >= 400 && error.status < 500) {
          // Handle client-side error
          errorMsg = 'Client-side error occurred:';
        } else {
          // Handle server-side error
          errorMsg = 'Server-side error occurred:';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
