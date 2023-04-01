import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, filter, finalize, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor in request:", httpRequest);
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      // filter((event: any) => {
      //   console.log("Passed through the interceptor in response filter: ", event);
      //   return event instanceof HttpResponse
      // }),
      catchError((error: HttpErrorResponse) => {
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
