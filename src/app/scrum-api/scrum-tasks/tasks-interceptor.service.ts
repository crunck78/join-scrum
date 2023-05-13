import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Subtask } from '../scrum-subtasks/scrum-subtasks.service';
import { TaskRequest, TaskResponse } from './scrum-tasks.service';
import { CategoryAPI } from '../scrum-categories/categories-interceptor.service';
import { ContactAPI } from '../scrum-contacts/contacts-interceptor.service';
import { SubtaskAPI } from '../scrum-subtasks/subtasks-interceptor.service';

export const TASKS_ENDPOINT = 'api/task/tasks/';

/**
 * API expected JSON format
 */
export interface TaskRequestAPI {
  title: string;
  description: string;
  category: number;
  assignees: number[];
  due_date: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: number[];
}

/**
 * API expected JSON response format
 */
export interface TaskResponseAPI {
  id: number,
  title: string;
  description: string;
  category: CategoryAPI;
  assignees: ContactAPI[];
  due_date: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  subtasks: SubtaskAPI[];
  created_at: string;
  updated_at: string;
  user: any;
}

/**
 * Expected create, update, path, put request JSON format
 * @param {TaskRequest} - JSON format in front end for create, update, path, put request
 * @returns {TaskRequestAPI} - API expected JSON format
 */
export function serializeTaskRequest(task: TaskRequest): TaskRequestAPI {
  return {
    title: task.title ?? '',
    description: task.description ?? '',
    category: task.category ?? 0,
    assignees: task.assignees ?? [],
    due_date: task.dueDate?.toISOString().slice(0, 10) ?? '',
    priority: task.priority ?? 'Low',
    subtasks: task.subtasks ?? [],
  }
}

/**
 * Expected response
 * @param {TaskResponseAPI} - API expected JSON response format
 * @returns {TaskResponse} JSON format in front end for response
 */
export function serializeTaskResponse(task: TaskResponseAPI): TaskResponse {
  return {
    id: task.id ?? 0,
    title: task.title ?? '',
    description: task.description ?? '',
    category: task.category ?? null,
    assignees: task.assignees ?? [],
    dueDate: new Date(task.due_date) ?? '',
    priority: task.priority ?? 'Low',
    subtasks: task.subtasks ?? [],
    updatedAt: new Date(task.updated_at) ?? '',
    createdAt: new Date(task.created_at) ?? '',
  }
}


@Injectable()
export class TasksInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.method != 'GET' && httpRequest.url.startsWith(TASKS_ENDPOINT)) {
      httpRequest = httpRequest.clone({
        body: serializeTaskRequest(httpRequest.body)
      });
    }
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
