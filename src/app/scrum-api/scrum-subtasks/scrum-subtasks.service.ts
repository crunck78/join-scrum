import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
	Subtask,
	SubtaskRequest,
	SubtaskResponse,
	SubtaskResponseAPI,
} from "../../shared/models/subtask.model";
export const SUBTASKS_ENDPOINT = "/api/subtask/subtasks/";

@Injectable({
	providedIn: "root",
})
export class ScrumSubtasksService {
	private http = inject(HttpClient);

	subtasksEndpoint = SUBTASKS_ENDPOINT;

	getSubtasks$(): Observable<SubtaskResponse[]> {
		return this.http.get<SubtaskResponseAPI[]>(this.subtasksEndpoint).pipe(
			map((subtasks) => subtasks.map((s) => Subtask.createInternalValue(s))),
			catchError(() => of([])),
		);
	}

	addSubtask$(
		subtask: Partial<SubtaskRequest>,
	): Observable<SubtaskResponse | null> {
		const newSubtask = Subtask.createRepresentation(subtask);
		return this.http
			.post<SubtaskResponseAPI>(this.subtasksEndpoint, newSubtask)
			.pipe(
				map((subtask) =>
					subtask ? Subtask.createInternalValue(subtask) : null,
				),
				catchError(() => of(null)),
			);
	}

	updateSubtask$(
		subtaskId: number,
		taskRequest: Partial<SubtaskRequest>,
	): Observable<SubtaskResponse | null> {
		const subtaskRequestAPI = Subtask.createRepresentation(taskRequest);
		return this.http
			.patch<SubtaskResponseAPI | null>(
				`${this.subtasksEndpoint}${subtaskId}/`,
				subtaskRequestAPI,
			)
			.pipe(
				map((subtask) =>
					subtask ? Subtask.createInternalValue(subtask) : null,
				),
				catchError(() => of(null)),
			);
	}
}
