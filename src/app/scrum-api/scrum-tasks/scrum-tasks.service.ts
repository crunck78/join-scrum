import { Injectable } from '@angular/core';
import { TASKS_ENDPOINT } from './tasks-interceptor.service';
import { ScrumApiService } from '../scrum-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Task, TaskRequest, TaskResponse, TaskResponseAPI } from 'src/app/shared/models/task.model';


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
        catchError(error => of([])),
        map(tasks => tasks.map(t => Task.createInternalValue(t)))
      );
  }

  getBacklog$(): Observable<TaskResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint + '?list_is_null=true', { headers })
      .pipe(
        catchError(error => of([])),
        map(tasks => tasks.map(t => Task.createInternalValue(t)))
      );
  }

  addTask$(task: Partial<TaskRequest>) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newTask = Task.createRepresentation(task);
    return this.http.post<TaskResponseAPI | null>(this.tasksEndpoint, newTask, { headers })
      .pipe(
        catchError(error => of(null)),
        map(task => task ? Task.createInternalValue(task) : null)
      );
  }
}
