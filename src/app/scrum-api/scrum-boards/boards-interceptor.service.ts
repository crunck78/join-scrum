import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export const BOARDS_ENDPOINT = 'api/board/boards/';
export interface BoardRequestAPI {
  title: string;
}

export interface ListResponseAPI{
  id: string,
  user: string,
  name: string,
  created_at: Date,
  updated_at: Date,
}

export interface BoardResponseAPI {
  title: string;
  id: string,
  user: string,
  lists: ListResponseAPI[],
  created_at: Date,
  updated_at: Date,
}

@Injectable()
export class BoardsInterceptor {

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
