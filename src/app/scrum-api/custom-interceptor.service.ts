import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, finalize, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => {
        return event instanceof HttpResponse
      }),
      map((event: HttpResponse<any>) => {
        return event.clone({ body: event.body });
      })
    );
  }
}
