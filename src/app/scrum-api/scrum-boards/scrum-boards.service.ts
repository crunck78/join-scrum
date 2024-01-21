import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { BoardResponse, BoardResponseAPI, Board, BoardRequest } from 'src/app/shared/models/board.model';

export const BOARDS_ENDPOINT = 'api/board/boards/';

@Injectable({
  providedIn: 'root'
})
export class ScrumBoardsService {

  boardsEndpoint = BOARDS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getBoards$() : Observable<BoardResponse[]> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<BoardResponseAPI[]>(this.boardsEndpoint, { headers })
      .pipe(
        catchError(() => of([])),
        map(boards => boards.map(b => Board.createInternalValue(b)))
      );
  }

  addBoard$(board: Partial<BoardRequest>) : Observable<BoardResponse | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newBoard = Board.createRepresentation(board);

    return this.http.post<BoardResponseAPI>(this.boardsEndpoint, newBoard, { headers })
      .pipe(
        catchError(() => of(null)),
        map(board => board ? Board.createInternalValue(board) : null)
      );
  }

  getBoardById$(id: string) : Observable<BoardResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<BoardResponseAPI>(this.boardsEndpoint + id + '/', { headers })
      .pipe(
        catchError(() => of(null)),
        map(board => board ? Board.createInternalValue(board) : null)
      );
  }
}
