import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

export const SIGNUP_ENDPOINT = '/api/user/create/';

@Injectable()
export class SignupInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => event instanceof HttpResponse && httpRequest.url == SIGNUP_ENDPOINT),
      map((event: HttpResponse<any>) => event.clone({ body: event.body }))
    );
  }
}
