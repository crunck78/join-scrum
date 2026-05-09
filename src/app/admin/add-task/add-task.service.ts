import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBarDismiss } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";
import { ScrumCategoriesService } from "../../scrum-api/scrum-categories/scrum-categories.service";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { ScrumSubtasksService } from "../../scrum-api/scrum-subtasks/scrum-subtasks.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { CategoryResponse } from "../../shared/models/category.model";
import { ContactResponse } from "../../shared/models/contact.model";
import { TaskRequest } from "../../shared/models/task.model";
import { AddCategoryComponent } from "../../shared/shared-components/dialogs/add-category/add-category.component";
import { AddContactComponent } from "../../shared/shared-components/dialogs/add-contact/add-contact.component";
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

	addTask(task: Partial<TaskRequest>) {
		return this.scrumTask.addTask$(task).pipe(
			take(1),
			tap((newTask) => {
				if (!newTask) return;
				const feedbackRef = this.feedback.openSnackBar(
					"Task Created!",
					"To Board",
				);
				feedbackRef.afterDismissed().subscribe((value: MatSnackBarDismiss) => {
					if (value.dismissedByAction) this.router.navigate(["/board"]);
				});
			}),
		);
	}

	editTask(taskId: number, task: Partial<TaskRequest>) {
		return this.scrumTask.updateTask$(taskId, task).pipe(take(1));
	}

	deleteTask(taskId: number) {
		return this.scrumTask.deleteTask$(taskId).pipe(take(1));
	}

	openAddCategoryDialog() {
		const dialogRef = this.dialog.open<
			AddCategoryComponent,
			any,
			CategoryResponse | null
		>(AddCategoryComponent);
		return dialogRef.afterClosed().pipe(take(1));
	}

	openAddContactDialog() {
		const dialogRef = this.dialog.open<
			AddContactComponent,
			any,
			ContactResponse | null
		>(AddContactComponent);
		return dialogRef.afterClosed().pipe(take(1));
	}
}
