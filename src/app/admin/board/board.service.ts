import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { map, take } from "rxjs";
import { ScrumBoardsService } from "../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../scrum-api/scrum-lists/scrum-lists.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { ListResponse } from "../../shared/models/list.model";
import { TaskRequest } from "../../shared/models/task.model";
import { AddListComponent } from "../../shared/shared-components/dialogs/add-list/add-list.component";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class BoardService {
	private scrumTasks = inject(ScrumTasksService);
	private dialog = inject(MatDialog);
	private scrumBoards = inject(ScrumBoardsService);
	private breakPoints = inject(BreakpointsService);
	private scrumList = inject(ScrumListsService);
	private feedbackService = inject(FeedbackService);

	get board$() {
		return this.scrumBoards.getBoards$().pipe(
			take(1),
			map((boards) => (boards.length ? boards[0] : null)),
		);
	}

	get backlog$() {
		return this.scrumTasks.getBacklog$().pipe(take(1));
	}

	get boardLists$() {
		return this.board$.pipe(
			take(1),
			map((board) => board?.lists ?? []),
		);
	}

	get matchWebBreakpoint$() {
		return this.breakPoints.matchesWebBreakpoint$;
	}

	updateTask$(taskId: number, task: Partial<TaskRequest>) {
		return this.scrumTasks.updateTask$(taskId, task).pipe(take(1));
	}

	deleteTask$(taskId: number) {
		return this.scrumTasks.deleteTask$(taskId);
	}

	deleteList$(listId: number) {
		return this.scrumList.deleteList$(listId);
	}

	updateList(list: ListResponse) {
		this.scrumList
			.updateList$(list.id, list)
			.pipe(take(1))
			.subscribe((listUpdate) => {
				if (listUpdate) this.feedbackService.openSnackBar("List Updated", "Ok");
				else
					this.feedbackService.openSnackBar(
						"List Name Update Failed!",
						"Try Again",
					);
			});
	}

	setPosition$(list: ListResponse) {
		return this.scrumList.updateList$(list.id, list).pipe(take(1));
	}

	addBoard$() {
		return this.scrumBoards.addBoard$({ title: "First Board" }).pipe(take(1));
	}

	addList$() {
		return this.dialog
			.open<AddListComponent, any, ListResponse>(AddListComponent)
			.afterClosed()
			.pipe(
				map((newList) => {
					if (newList) {
						this.feedbackService.openSnackBar("List Created", "Ok");
					} else {
						this.feedbackService.openSnackBar(
							"List Creation Failed!",
							"Try Again",
						);
					}
					return newList; // Return the newList value
				}),
			);
	}
}
