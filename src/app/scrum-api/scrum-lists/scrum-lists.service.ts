import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ListResponse, ListResponseAPI, List, ListRequest } from 'src/app/shared/models/list.model';

export const LISTS_ENDPOINT = 'api/list/lists/';

@Injectable({
  providedIn: 'root'
})
export class ScrumListsService {

  listsEndpoint = LISTS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  deleteList$(id: number): Observable<any | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.delete<number | null>(this.listsEndpoint + `/${id}/`, { headers })
      .pipe(
        catchError(error => of(null)),
        map(value => value || null)
      );
  }

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

  addList$(list: Partial<ListRequest>): Observable<ListResponse | null> {

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

  getListById$(id: string): Observable<ListResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<ListResponseAPI>(this.listsEndpoint + id + '/', { headers })
      .pipe(
        catchError(error => of(null)),
        map(list => list ? List.createInternalValue(list) : null)
      );
  }

  updateList$(listId: number, listRequest: Partial<ListRequest>): Observable<ListResponse | null>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const taskRequestAPI = List.createRepresentation(listRequest);

    return this.http.patch<ListResponseAPI | null>(`${this.listsEndpoint}${listId}/`, taskRequestAPI, { headers })
      .pipe(
        catchError(error => of(null)),
        map(list => list ? List.createInternalValue(list) : null)
      );
  }
}
