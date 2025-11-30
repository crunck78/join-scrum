import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SubtaskRequest } from "../../shared/models/subtask.model";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { OptionsPipe } from "../../shared/pipes/options/options.pipe";
import { CardComponent } from "../../shared/shared-components/card/card.component";
import { FormFieldComponent } from "../../shared/shared-components/form-field/form-field.component";
import { PageTitleComponent } from "../../shared/shared-components/page-title/page-title.component";
import { SubtaskComponent } from "./subtask/subtask/subtask.component";

export interface Priority {
	name: string;
	icon: string;
	color: string;
}

export interface TaskFormGroup {
	title: string;
	description: string;
	category: number | null;
	assignees: number[];
	dueDate: Date | null;
	priority: PriorityType | null;
	subtasks: SubtaskRequest[];
}

export declare type PriorityType = "Low" | "Medium" | "Urgent";
export declare type TaskMode = "add" | "edit";

const imports = [
	CommonModule,
	ReactiveFormsModule,
	OptionsPipe,
	FormFieldComponent,
	CardComponent,
	PageTitleComponent,
	MaterialModule,
	FormsModule,
	SubtaskComponent,
];

@NgModule({
	declarations: [],
	imports: [imports],
	exports: [...imports],
})
export class AddTaskModule {}
