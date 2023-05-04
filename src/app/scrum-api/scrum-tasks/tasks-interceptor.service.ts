import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export const TASKS_ENDPOINT = 'api/task/tasks/';
export interface TaskAPI {
  title: string;
  description: string;
  category: number;
  assignees: number[];
  due_date: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: number[];
}

@Injectable()
export class TasksInterceptor {

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
