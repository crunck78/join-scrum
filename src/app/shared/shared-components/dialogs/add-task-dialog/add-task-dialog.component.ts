import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlStatus } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/admin/add-task/add-task.component';
import { TaskMode } from 'src/app/admin/add-task/add-task.module';
import { TaskResponse, TaskRequest } from 'src/app/shared/models/task.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    AddTaskComponent,
    MaterialModule
  ]
})
export class AddTaskDialogComponent {
  task!: TaskResponse;
  mode: TaskMode = 'add';
  formStatus!: FormControlStatus;
  clearTaskForm = new EventEmitter();
  submitTaskForm = new EventEmitter();
  predefinedTaskRequest!: Partial<TaskRequest>;
  constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>) { }

  updateFormStatus(eventStatus: FormControlStatus) {
    this.formStatus = eventStatus;
  }

  get title() {
    if (this.mode == 'add')
      return 'Add Task';
    if (this.mode == 'edit')
      return 'Edit Task';
    return '';
  }

  handleEditedTask(editedTask: TaskResponse){
    this.dialogRef.close(editedTask);
  }
}
