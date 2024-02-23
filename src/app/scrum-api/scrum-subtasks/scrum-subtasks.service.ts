import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SubtaskResponse, SubtaskResponseAPI, Subtask, SubtaskRequest } from 'src/app/shared/models/subtask.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const SUBTASKS_ENDPOINT = SCRUM_API_ENDPOINT + 'api/subtask/subtasks/';

@Injectable({
  providedIn: 'root'
})
export class ScrumSubtasksService {

  subtasksEndpoint = SUBTASKS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getSubtasks$(): Observable<SubtaskResponse[]> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<SubtaskResponseAPI[]>(this.subtasksEndpoint, options)
      .pipe(
        map(subtasks => subtasks.map(s => Subtask.createInternalValue(s))),
        catchError(() => of([]))
      );
  }

  addSubtask$(subtask: Partial<SubtaskRequest>): Observable<SubtaskResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const newSubtask = Subtask.createRepresentation(subtask);
    return this.http.post<SubtaskResponseAPI>(this.subtasksEndpoint, newSubtask, options)
      .pipe(
        map(subtask => subtask ? Subtask.createInternalValue(subtask) : null),
        catchError(() => of(null))
      );
  }

  updateSubtask$(subtaskId: number, taskRequest: Partial<SubtaskRequest>): Observable<SubtaskResponse | null>{
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const subtaskRequestAPI = Subtask.createRepresentation(taskRequest);
    return this.http.patch<SubtaskResponseAPI | null>(`${this.subtasksEndpoint}${subtaskId}/`, subtaskRequestAPI, options)
      .pipe(
        map(subtask => subtask ? Subtask.createInternalValue(subtask) : null),
        catchError(() => of(null))
      );
  }
}
