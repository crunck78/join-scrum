import { Injectable } from '@angular/core';
import { BOARDS_ENDPOINT, BoardResponseAPI, ListResponseAPI } from './boards-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, map, of } from 'rxjs';

export interface ListResponse {
  id: string,
  user: string,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface BoardResponse {
  title: string;
  id: string,
  user: string,
  lists: ListResponse[],
  createdAt: Date,
  updatedAt: Date,
}

export interface BoardRequest {
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumBoardsService {

  boardsEndpoint = BOARDS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getBoards$() {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<BoardResponse[]>(this.boardsEndpoint, { headers })
      .pipe(
        catchError(error => of<any>([])),
        map((values: BoardResponseAPI[]) => {
          return values.map((v: BoardResponseAPI) => {
            let boardResponse = this.scrumApi.renameFields(v, ['created_at', 'updated_at'], ['createdAt', 'updatedAt']);
            boardResponse = boardResponse.lists.map((list: ListResponseAPI) => this.scrumApi.renameFields(list, ['created_at', 'updated_at'], ['createdAt', 'updatedAt']) as ListResponse);
            return boardResponse as BoardResponse;
          });
        })
      );
  }

  addTask$(newBoard: BoardRequest) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.post<BoardRequest | undefined | any>(this.boardsEndpoint, newBoard, { headers })
      .pipe(
        catchError(error => of(undefined)),
        map((value: BoardResponseAPI) => {
          let boardResponse = this.scrumApi.renameFields(value, ['created_at', 'updated_at'], ['createdAt', 'updatedAt']);
          boardResponse = boardResponse.lists.map((list: ListResponseAPI) => this.scrumApi.renameFields(list, ['created_at', 'updated_at'], ['createdAt', 'updatedAt']) as ListResponse);
          return boardResponse as BoardResponse;
        })
      );
  }
}
