import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

export const RESET_PASSWORD_ENDPOINT = '/api/user/reset-password/'

@Injectable()
export class ResetPasswordInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor in request:", httpRequest);
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      filter((event: any) => {
        console.log("Passed through the interceptor in response filter: ", event);
        return event instanceof HttpResponse && httpRequest.url == RESET_PASSWORD_ENDPOINT
      }),
      map((event: HttpResponse<any>) => event.clone({ body: event.body }))
    );
  }
}
