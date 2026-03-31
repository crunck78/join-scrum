import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Board,
	BoardRequest,
	BoardResponse,
	BoardResponseAPI,
} from "../../shared/models/board.model";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const BOARDS_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/board/boards/`;

@Injectable({
	providedIn: "root",
})
export class ScrumBoardsService {
	private http = inject(HttpClient);

	boardsEndpoint = BOARDS_ENDPOINT;

	getBoards$(): Observable<BoardResponse[]> {
		return this.http.get<BoardResponseAPI[]>(this.boardsEndpoint).pipe(
			map((boards) => boards.map((b) => Board.createInternalValue(b))),
			catchError(() => of([])),
		);
	}

	addBoard$(board: Partial<BoardRequest>): Observable<BoardResponse | null> {
		const newBoard = Board.createRepresentation(board);
		return this.http.post<BoardResponseAPI>(this.boardsEndpoint, newBoard).pipe(
			map((board) => (board ? Board.createInternalValue(board) : null)),
			catchError(() => of(null)),
		);
	}

	getBoardById$(id: string): Observable<BoardResponse | null> {
		return this.http.get<BoardResponseAPI>(`${this.boardsEndpoint + id}/`).pipe(
			map((board) => (board ? Board.createInternalValue(board) : null)),
			catchError(() => of(null)),
		);
	}
}
