import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, filter, tap } from 'rxjs';

export const SCRUM_API_ENDPOINT = environment.apiEndpoint;

@Injectable()
export class ScrumApiInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => {
        return event instanceof HttpResponse;
      }),
      tap((event: HttpResponse<any>) => {
        return event;
      })
    );
  }
}
