import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ScrumCategoriesService } from "../../scrum-api/scrum-categories/scrum-categories.service";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { ScrumSubtasksService } from "../../scrum-api/scrum-subtasks/scrum-subtasks.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { FeedbackService } from "../../shared/shared-services/feedback/feedback.service";

@Injectable({
	providedIn: "any",
})
export class AddTaskService {
	scrumCategory = inject(ScrumCategoriesService);
	scrumContacts = inject(ScrumContactsService);
	dialog = inject(MatDialog);
	scrumSubtasks = inject(ScrumSubtasksService);
	scrumTask = inject(ScrumTasksService);
	router = inject(Router);
	feedback = inject(FeedbackService);

	get categories$() {
		return this.scrumCategory.getCategories$();
	}

	get contacts$() {
		return this.scrumContacts.getContacts$();
	}

	get subtasks$() {
		return this.scrumSubtasks.getSubtasks$();
	}
}
