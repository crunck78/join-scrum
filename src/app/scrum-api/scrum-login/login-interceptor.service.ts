import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';

export const LOGIN_ENDPOINT = '/api/user/token/';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private scrumApi: ScrumApiService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passed through the interceptor in request:", httpRequest);
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      filter((event: any) => {
        console.log("Passed through the interceptor in response filter: ", event);
        return event instanceof HttpResponse;
      }),
      tap((event: HttpResponse<any>) => {
        if (this.scrumApi.rememberMe && httpRequest.url == LOGIN_ENDPOINT)
          this.scrumApi.localToken = event.body.token;
          return event;
      })
    );
  }
}
