import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

export const FORGOT_PASSWORD_ENDPOINT = '/api/user/forgot-password/'

@Injectable()
export class ForgotPasswordInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => event instanceof HttpResponse && httpRequest.url == FORGOT_PASSWORD_ENDPOINT),
      map((event: HttpResponse<any>) => event.clone({ body: event.body }))
    );
  }
}
