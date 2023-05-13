import { Injectable } from '@angular/core';
import { TASKS_ENDPOINT, TaskResponseAPI } from './tasks-interceptor.service';
import { ScrumApiService } from '../scrum-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContactAPI } from '../scrum-contacts/contacts-interceptor.service';
import { CategoryAPI } from '../scrum-categories/categories-interceptor.service';
import { SubtaskAPI } from '../scrum-subtasks/subtasks-interceptor.service';
import { Contact } from '../scrum-contacts/scrum-contacts.service';

/**
 * JSON format in front end for create, update, path, put request
 */
export interface TaskRequest {
  id?: string,
  title?: string | null | undefined,
  description?: string | null | undefined,
  category?: number | null,
  assignees?: number[] | null,
  dueDate?: Date | null;
  priority?: 'Low' | 'Medium' | 'Urgent' | null;
  subtasks?: number[] | null;
}

/**
 * JSON format in front end for response
 */
export interface TaskResponse {
  id: number,
  title?: string | null | undefined,
  description?: string | null | undefined,
  category?: CategoryAPI | null,
  assignees?: ContactAPI[] | null,
  dueDate?: Date | null;
  priority?: 'Low' | 'Medium' | 'Urgent' | null;
  subtasks?: SubtaskAPI[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumTasksService {

  tasksEndpoint = TASKS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getTasks$() {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<TaskResponse[]>(this.tasksEndpoint, { headers })
      .pipe(
        catchError(error => of<any>([])),
        map((values: TaskResponseAPI[]) => {
          return values.map((v: TaskResponseAPI) => {
            let taskResponse = this.scrumApi.renameFields(v, ['created_at', 'updated_at', 'due_date'], ['createdAt', 'updatedAt', 'dueDate']);
            taskResponse = taskResponse.assignees.map((a: ContactAPI) => this.scrumApi.renameFields(a, ['phone_number'], ['phoneNumber']) as Contact);
            return taskResponse as TaskResponse;
          });
        })
      );
  }

  addTask$(newTask: TaskRequest) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const taskRequestAPI = this.scrumApi.renameFields(newTask,['createdAt', 'updatedAt', 'dueDate'], ['created_at', 'updated_at', 'due_date'])
    taskRequestAPI.due_date = newTask.dueDate?.toISOString().slice(0, 10) ?? '';
    return this.http.post<TaskResponse | undefined | any>(this.tasksEndpoint, taskRequestAPI, { headers })
      .pipe(
        catchError(error => of(undefined)),
        map((value: TaskResponseAPI) => {
          let taskResponse = this.scrumApi.renameFields(value, ['created_at', 'updated_at', 'due_date'], ['createdAt', 'updatedAt', 'dueDate']);
          taskResponse.assignees = taskResponse.assignees.map((a: ContactAPI) => this.scrumApi.renameFields(a, ['phone_number'], ['phoneNumber']) as Contact);
          return taskResponse as TaskResponse;
        })
      );
  }
}
