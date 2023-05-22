import { Injectable } from '@angular/core';
import { LISTS_ENDPOINT } from './lists-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { List, ListRequest, ListResponse, ListResponseAPI } from 'src/app/shared/models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ScrumListsService {

  listsEndpoint = LISTS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getLists$(): Observable<ListResponse[]> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<ListResponseAPI[]>(this.listsEndpoint, { headers })
      .pipe(
        catchError(error => of([])),
        map(lists => lists.map(l => List.createInternalValue(l)))
      );
  }

  addList$(list: Partial<ListRequest>) : Observable<ListResponse | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newList = List.createRepresentation(list);

    return this.http.post<ListResponseAPI>(this.listsEndpoint, newList, { headers })
      .pipe(
        catchError(error => of(null)),
        map(list => list ? List.createInternalValue(list) : null)
      );
  }

  getListById$(id: string) : Observable<ListResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<ListResponseAPI>(this.listsEndpoint + id + '/', { headers })
      .pipe(
        catchError(error => of(null)),
        map(list => list ? List.createInternalValue(list) : null)
      );
  }
}