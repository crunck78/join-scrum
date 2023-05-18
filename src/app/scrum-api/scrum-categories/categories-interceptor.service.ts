import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export const CATEGORIES_ENDPOINT = 'api/category/categories/';

@Injectable()
export class CategoriesInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      map((event) => {
        console.log("Passed through the interceptor in response: ", event);
        return event;
      }),
      filter((event: any) => {
        console.log("Passed through the interceptor in response filter: ", event);
        return event instanceof HttpResponse
      }),
      map((event: HttpResponse<any>) => {
        console.log(event.status);
        console.log(event.body);
        return event.clone({ body: event.body });
      })
    );
  }
}
