import { Injectable } from '@angular/core';
import { SUBTASKS_ENDPOINT } from './subtasks-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Subtask{
  id: number,
  title: string,
  done: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ScrumSubtasksService {

  subtasksEndpoint = SUBTASKS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getSubtasks$() {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<Subtask[]>(this.subtasksEndpoint, { headers })
      .pipe(catchError(error => of<Subtask[]>([])));
  }

  addSubtask$(newSubtask: Subtask) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.post<Subtask>(this.subtasksEndpoint, newSubtask, { headers })
    .pipe(catchError(error => of(undefined)));
  }
}
