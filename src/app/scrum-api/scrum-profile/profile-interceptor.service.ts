import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of } from 'rxjs';

export const PROFILE_ENDPOINT = '/api/user/me/'

@Injectable()
export class ProfileInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor in request:", httpRequest);
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      filter((event: any) => {
        console.log("Passed through the interceptor in response filter: ", event);
        return  event instanceof HttpResponse && httpRequest.url == PROFILE_ENDPOINT;
      }),
      map((event: HttpResponse<any>) => event.clone({ body: event.body }))
    );
  }
}
