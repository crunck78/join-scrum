import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
	Task,
	TaskRequest,
	TaskResponse,
	TaskResponseAPI,
} from "../../shared/models/task.model";
export const TASKS_ENDPOINT = "/api/task/tasks/";

@Injectable({
	providedIn: "root",
})
export class ScrumTasksService {
	private http = inject(HttpClient);

	tasksEndpoint = TASKS_ENDPOINT;

	getTasks$(): Observable<TaskResponse[]> {
		return this.http.get<TaskResponseAPI[]>(this.tasksEndpoint).pipe(
			map((tasks) => tasks.map((t) => Task.createInternalValue(t))),
			catchError(() => of([])),
		);
	}

	getBacklog$(): Observable<TaskResponse[]> {
		return this.http
			.get<TaskResponseAPI[]>(`${this.tasksEndpoint}?list_is_null=true`)
			.pipe(
				map((tasks) => tasks.map((t) => Task.createInternalValue(t))),
				catchError(() => of([])),
			);
	}

	addTask$(task: Partial<TaskRequest>): Observable<TaskResponse | null> {
		const newTask = Task.createRepresentation(task);
		return this.http.post<TaskResponseAPI>(this.tasksEndpoint, newTask).pipe(
			map((task) => Task.createInternalValue(task)),
			catchError(() => of(null)),
		);
	}

	deleteTask$(taskId: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.tasksEndpoint + taskId}/`).pipe(
			map(() => true),
			catchError(() => of(false)),
		);
	}

	updateTask$(
		taskId: number,
		taskRequest: Partial<TaskRequest>,
	): Observable<TaskResponse | null> {
		const taskRequestAPI = Task.createRepresentation(taskRequest);
		return this.http
			.patch<TaskResponseAPI>(`${this.tasksEndpoint}${taskId}/`, taskRequestAPI)
			.pipe(
				map((task) => Task.createInternalValue(task)),
				catchError(() => of(null)),
			);
	}
}
