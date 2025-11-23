import { Injectable } from "@angular/core";
import type { MatDialog } from "@angular/material/dialog";
import type { ScrumBoardsService } from "src/app/scrum-api/scrum-boards/scrum-boards.service";
import type { ScrumListsService } from "src/app/scrum-api/scrum-lists/scrum-lists.service";
import type { ScrumTasksService } from "src/app/scrum-api/scrum-tasks/scrum-tasks.service";
import type { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";
import type { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class BoardService {
	constructor(
		public scrumTasks: ScrumTasksService,
		public dialog: MatDialog,
		public scrumBoards: ScrumBoardsService,
		public breakPoints: BreakpointsService,
		public scrumList: ScrumListsService,
		public feedbackService: FeedbackService,
	) {}

	get boards$() {
		return this.scrumBoards.getBoards$();
	}

	get backlog$() {
		return this.scrumTasks.getBacklog$();
	}
}
