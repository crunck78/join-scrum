import { Injectable } from '@angular/core';
import { SUBTASKS_ENDPOINT } from './subtasks-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subtask, SubtaskRequest, SubtaskResponse, SubtaskResponseAPI } from 'src/app/shared/models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class ScrumSubtasksService {

  subtasksEndpoint = SUBTASKS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getSubtasks$(): Observable<SubtaskResponse[]> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<SubtaskResponseAPI[]>(this.subtasksEndpoint, { headers })
      .pipe(
        catchError(error => of([])),
        map(subtasks => subtasks.map(s => Subtask.createInternalValue(s)))
      );
  }

  addSubtask$(subtask: Partial<SubtaskRequest>): Observable<SubtaskResponse | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newSubtask = Subtask.createRepresentation(subtask);

    return this.http.post<SubtaskResponseAPI>(this.subtasksEndpoint, newSubtask, { headers })
      .pipe(
        catchError(error => of(null)),
        map(subtask => subtask ? Subtask.createInternalValue(subtask) : null)
      );
  }

  updateSubtask$(subtaskId: number, taskRequest: Partial<SubtaskRequest>): Observable<SubtaskResponse | null>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const subtaskRequestAPI = Subtask.createRepresentation(taskRequest);

    return this.http.patch<SubtaskResponseAPI | null>(`${this.subtasksEndpoint}${subtaskId}/`, subtaskRequestAPI, { headers })
      .pipe(
        catchError(error => of(null)),
        map(subtask => subtask ? Subtask.createInternalValue(subtask) : null)
      );
  }
}
