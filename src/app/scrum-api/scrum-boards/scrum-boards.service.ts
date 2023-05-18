import { Injectable } from '@angular/core';
import { BOARDS_ENDPOINT } from './boards-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Board, BoardRequest, BoardResponse, BoardResponseAPI } from 'src/app/shared/models/board.model';

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
        catchError(error => of([])),
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
        catchError(error => of(null)),
        map(board => board ? Board.createInternalValue(board) : null)
      );
  }

  getBoardById$(id: string) : Observable<BoardResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<BoardResponseAPI>(this.boardsEndpoint + id + '/', { headers })
      .pipe(
        catchError(error => of(null)),
        map(board => board ? Board.createInternalValue(board) : null)
      );
  }
}
