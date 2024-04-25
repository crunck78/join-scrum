import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { BoardResponse, BoardResponseAPI, Board, BoardRequest } from 'src/app/shared/models/board.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const BOARDS_ENDPOINT = SCRUM_API_ENDPOINT + '/api/board/boards/';

@Injectable({
  providedIn: 'root'
})
export class ScrumBoardsService {

  boardsEndpoint = BOARDS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getBoards$(): Observable<BoardResponse[]> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<BoardResponseAPI[]>(this.boardsEndpoint, options)
      .pipe(
        map(boards => boards.map(b => Board.createInternalValue(b))),
        catchError(() => of([])),
      );
  }

  addBoard$(board: Partial<BoardRequest>): Observable<BoardResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const newBoard = Board.createRepresentation(board);
    return this.http.post<BoardResponseAPI>(this.boardsEndpoint, newBoard, options)
      .pipe(
        map(board => board ? Board.createInternalValue(board) : null),
        catchError(() => of(null))
      );
  }

  getBoardById$(id: string): Observable<BoardResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<BoardResponseAPI>(this.boardsEndpoint + id + '/', options)
      .pipe(
        map(board => board ? Board.createInternalValue(board) : null),
        catchError(() => of(null))
      );
  }
}
