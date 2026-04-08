import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	List,
	ListRequest,
	ListResponse,
	ListResponseAPI,
} from "../../shared/models/list.model";
export const LISTS_ENDPOINT = "/api/list/lists/";

@Injectable({
	providedIn: "root",
})
export class ScrumListsService {
	private http = inject(HttpClient);

	listsEndpoint = LISTS_ENDPOINT;

	deleteList$(id: number): Observable<boolean> {
		return this.http.delete<void>(`${this.listsEndpoint + id}/`).pipe(
			map(() => true),
			catchError(() => of(false)),
		);
	}

	getLists$(): Observable<ListResponse[]> {
		return this.http.get<ListResponseAPI[]>(this.listsEndpoint).pipe(
			map((lists) => lists.map((l) => List.createInternalValue(l))),
			catchError(() => of([])),
		);
	}

	addList$(list: Partial<ListRequest>): Observable<ListResponse | null> {
		const newList = List.createRepresentation(list);
		return this.http.post<ListResponseAPI>(this.listsEndpoint, newList).pipe(
			map((list) => (list ? List.createInternalValue(list) : null)),
			catchError(() => of(null)),
		);
	}

	getListById$(id: string): Observable<ListResponse | null> {
		return this.http.get<ListResponseAPI>(`${this.listsEndpoint + id}/`).pipe(
			map((list) => (list ? List.createInternalValue(list) : null)),
			catchError(() => of(null)),
		);
	}

	updateList$(
		listId: number,
		listRequest: Partial<ListRequest>,
	): Observable<ListResponse | null> {
		const taskRequestAPI = List.createRepresentation(listRequest);
		return this.http
			.patch<ListResponseAPI | null>(
				`${this.listsEndpoint}${listId}/`,
				taskRequestAPI,
			)
			.pipe(
				map((list) => (list ? List.createInternalValue(list) : null)),
				catchError(() => of(null)),
			);
	}
}
