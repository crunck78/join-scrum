import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, type Observable, of } from "rxjs";
import {
	List,
	type ListRequest,
	type ListResponse,
	type ListResponseAPI,
} from "src/app/shared/models/list.model";
import { ScrumApiService } from "../scrum-api.service";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const LISTS_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/list/lists/`;

@Injectable({
	providedIn: "root",
})
export class ScrumListsService {
	private http = inject(HttpClient);
	private scrumApi = inject(ScrumApiService);

	listsEndpoint = LISTS_ENDPOINT;

	deleteList$(id: number): Observable<number | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http
			.delete<number | null>(`${this.listsEndpoint + id}/`, options)
			.pipe(
				map((value) => value || null),
				catchError(() => of(null)),
			);
	}

	getLists$(): Observable<ListResponse[]> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http.get<ListResponseAPI[]>(this.listsEndpoint, options).pipe(
			map((lists) => lists.map((l) => List.createInternalValue(l))),
			catchError(() => of([])),
		);
	}

	addList$(list: Partial<ListRequest>): Observable<ListResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		const newList = List.createRepresentation(list);
		return this.http
			.post<ListResponseAPI>(this.listsEndpoint, newList, options)
			.pipe(
				map((list) => (list ? List.createInternalValue(list) : null)),
				catchError(() => of(null)),
			);
	}

	getListById$(id: string): Observable<ListResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http
			.get<ListResponseAPI>(`${this.listsEndpoint + id}/`, options)
			.pipe(
				map((list) => (list ? List.createInternalValue(list) : null)),
				catchError(() => of(null)),
			);
	}

	updateList$(
		listId: number,
		listRequest: Partial<ListRequest>,
	): Observable<ListResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		const taskRequestAPI = List.createRepresentation(listRequest);
		return this.http
			.patch<ListResponseAPI | null>(
				`${this.listsEndpoint}${listId}/`,
				taskRequestAPI,
				options,
			)
			.pipe(
				map((list) => (list ? List.createInternalValue(list) : null)),
				catchError(() => of(null)),
			);
	}
}
