import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

export const PROFILE_ENDPOINT = '/api/user/me/'

@Injectable()
export class ProfileInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => event instanceof HttpResponse && httpRequest.url == PROFILE_ENDPOINT),
      map((event: HttpResponse<any>) => event.clone({ body: event.body }))
    );
  }
}
