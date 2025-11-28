import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ScrumBoardsService } from "../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../scrum-api/scrum-lists/scrum-lists.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "root",
})
export class BoardService {
	scrumTasks = inject(ScrumTasksService);
	dialog = inject(MatDialog);
	scrumBoards = inject(ScrumBoardsService);
	breakPoints = inject(BreakpointsService);
	scrumList = inject(ScrumListsService);
	feedbackService = inject(FeedbackService);

	get boards$() {
		return this.scrumBoards.getBoards$();
	}

	get backlog$() {
		return this.scrumTasks.getBacklog$();
	}
}
