import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const LOGIN_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/token/';
export const GUEST_LOGIN_ENDPOINT = SCRUM_API_ENDPOINT + '/api/user/create-guest/';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private scrumApi: ScrumApiService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => event instanceof HttpResponse),
      tap((event: HttpResponse<any>) => {
        if (this.scrumApi.rememberMe && (httpRequest.url == LOGIN_ENDPOINT || httpRequest.url == GUEST_LOGIN_ENDPOINT))
          this.scrumApi.localToken = event.body.token;
        return event;
      })
    );
  }
}
