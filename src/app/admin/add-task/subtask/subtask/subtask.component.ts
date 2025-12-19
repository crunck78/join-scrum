import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject } from "rxjs";
import { SubtaskRequest } from "../../../../shared/models/subtask.model";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { ContentEditableComponent } from "../../../../shared/shared-components/content-editable/content-editable.component";
@Component({
	selector: "app-subtask",
	templateUrl: "./subtask.component.html",
	styleUrls: ["./subtask.component.scss"],
	imports: [MaterialModule, ContentEditableComponent],
})
export class SubtaskComponent {
	changingSubtaskTitle$ = new Subject<number | string>();

	@Input() subtask!: SubtaskRequest;
	@Input() subtaskId!: number | string;

	@Output() removeSubtask$ = new EventEmitter<SubtaskRequest>();

	updateSubtaskCheck(checked: boolean) {
		this.subtask.done = checked;
	}

	editSubtask() {
		this.changingSubtaskTitle$.next(this.subtaskId);
	}
}
