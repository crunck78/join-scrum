import { Injectable } from '@angular/core';
import { ScrumApiService } from '../scrum-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint, { headers })
      .pipe(
        catchError(() => of([])),
        map(tasks => tasks.map(t => Task.createInternalValue(t)))
      );
  }

  getBacklog$(): Observable<TaskResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint + '?list_is_null=true', { headers })
      .pipe(
        catchError(() => of([])),
        map(tasks => tasks.map(t => Task.createInternalValue(t)))
      );
  }

  addTask$(task: Partial<TaskRequest>) : Observable<TaskResponse | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newTask = Task.createRepresentation(task);
    return this.http.post<TaskResponseAPI | null>(this.tasksEndpoint, newTask, { headers })
      .pipe(
        catchError(() => of(null)),
        map(task => task ? Task.createInternalValue(task) : null)
      );
  }

  deleteTask$(taskId: number) : Observable<number | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.delete<number | null>(this.tasksEndpoint + `/${taskId}/`, { headers })
      .pipe(
        catchError(() => of(null)),
        map(value => value || null)
      );
  }

  updateTask$(taskId: number, taskRequest: Partial<TaskRequest>): Observable<TaskResponse | null>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const taskRequestAPI = Task.createRepresentation(taskRequest);

    return this.http.patch<TaskResponseAPI | null>(`${this.tasksEndpoint}${taskId}/`, taskRequestAPI, { headers })
      .pipe(
        catchError(() => of(null)),
        map(task => task ? Task.createInternalValue(task) : null)
      );
  }
}
