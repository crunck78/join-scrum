import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubtaskRequest } from 'src/app/shared/models/subtask.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { OptionsPipe } from 'src/app/shared/pipes/options/options.pipe';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { ContentEditableComponent } from 'src/app/shared/shared-components/content-editable/content-editable.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { SubtaskComponent } from './subtask/subtask/subtask.component';

export interface Priority {
  name: string,
  icon: string,
  color: string
}

export interface TaskFormGroup {
  title: string,
  description: string,
  category: number | null,
  assignees: number[],
  dueDate: Date | null,
  priority: PriorityType | null,
  subtasks: SubtaskRequest[]
}

export declare type PriorityType = 'Low' | 'Medium' | 'Urgent';
export declare type TaskMode = 'add' | 'edit';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  OptionsPipe,
  FormFieldComponent,
  CardComponent,
  PageTitleComponent,
  MaterialModule,
  FormsModule,
  ContentEditableComponent
];

@NgModule({
  declarations: [
    SubtaskComponent
  ],
  imports: [imports],
  exports: [...imports, SubtaskComponent]
})
export class AddTaskModule { }
