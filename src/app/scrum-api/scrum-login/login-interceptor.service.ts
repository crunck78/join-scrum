import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, finalize, map, Observable, of, tap, throwError } from 'rxjs';

export const LOGIN_ENDPOINT = '/api/user/token/';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor in request:", httpRequest);
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      filter((event: any) => {
        console.log("Passed through the interceptor in response filter: ", event);
        return event instanceof HttpResponse && httpRequest.url == LOGIN_ENDPOINT
      }),
      map((event: HttpResponse<any>) => {
        console.log(event.status);
        return event.clone({ body: event.body });
      })
    );
  }
}
