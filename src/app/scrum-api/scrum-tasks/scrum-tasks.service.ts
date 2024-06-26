import { Injectable } from '@angular/core';
import { ScrumApiService } from '../scrum-api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TaskResponse, TaskResponseAPI, Task, TaskRequest } from 'src/app/shared/models/task.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';


export const TASKS_ENDPOINT = SCRUM_API_ENDPOINT + '/api/task/tasks/';

@Injectable({
  providedIn: 'root'
})
export class ScrumTasksService {

  tasksEndpoint = TASKS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getTasks$(): Observable<TaskResponse[]> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint, options)
      .pipe(
        map(tasks => tasks.map(t => Task.createInternalValue(t))),
        catchError(() => of([]))
      );
  }

  getBacklog$(): Observable<TaskResponse[]> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint + '?list_is_null=true', options)
      .pipe(
        map(tasks => tasks.map(t => Task.createInternalValue(t))),
        catchError(() => of([]))
      );
  }

  addTask$(task: Partial<TaskRequest>): Observable<TaskResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const newTask = Task.createRepresentation(task);
    return this.http.post<TaskResponseAPI | null>(this.tasksEndpoint, newTask, options)
      .pipe(
        map(task => task ? Task.createInternalValue(task) : null),
        catchError(() => of(null))
      );
  }

  deleteTask$(taskId: number): Observable<number | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.delete<number | null>(this.tasksEndpoint + taskId + `/`, options)
      .pipe(
        map(value => value || null),
        catchError(() => of(null))
      );
  }

  updateTask$(taskId: number, taskRequest: Partial<TaskRequest>): Observable<TaskResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const taskRequestAPI = Task.createRepresentation(taskRequest);
    return this.http.patch<TaskResponseAPI | null>(`${this.tasksEndpoint}${taskId}/`, taskRequestAPI, options)
      .pipe(
        map(task => task ? Task.createInternalValue(task) : null),
        catchError(() => of(null))
      );
  }
}
