import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	inject,
	Output,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import type { TaskResponse } from "../../models/task.model";
import { MaterialModule } from "../../modules/material/material.module";
import { ProgressLinearGradientPipe } from "../../pipes/progress-linear-gradient/progress-linear-gradient.pipe";
import { CategoryCardComponent } from "../category-card/category-card.component";
import { ContactInitialsComponent } from "../contact-initials/contact-initials.component";
import { AddTaskDialogComponent } from "../dialogs/add-task-dialog/add-task-dialog.component";

@Component({
	selector: "app-task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.scss"],
	imports: [
		ContactInitialsComponent,
		MaterialModule,
		ProgressLinearGradientPipe,
		CategoryCardComponent,
	],
})
export class TaskComponent {
	private dialog = inject(MatDialog);

	@Input() task!: TaskResponse;
	@Output() taskChange = new EventEmitter<TaskResponse>();

	get doneSubtasksLength() {
		return this.task.subtasks.filter((s) => s.done).length;
	}

	@HostListener("click")
	editTask() {
		const dialogRef = this.dialog.open(AddTaskDialogComponent, {
			data: { task: this.task, mode: "edit" },
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) this.taskChange.emit(result);
		});
	}
}
