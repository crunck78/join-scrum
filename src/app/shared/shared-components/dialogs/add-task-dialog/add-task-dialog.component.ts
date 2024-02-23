import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlStatus } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from 'src/app/admin/add-task/add-task.component';
import { TaskMode } from 'src/app/admin/add-task/add-task.module';
import { TaskResponse, TaskRequest } from 'src/app/shared/models/task.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DialogComponent } from '../../dialog/dialog.component';

export interface AddTaskDialogData {
  task: TaskResponse,
  mode: TaskMode
}

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
export class AddTaskDialogComponent implements OnInit {
  task!: TaskResponse;
  mode: TaskMode = 'add';
  formStatus!: FormControlStatus;
  clearTaskForm = new EventEmitter();
  deleteTask = new EventEmitter();
  submitTaskForm = new EventEmitter();
  predefinedTaskRequest!: Partial<TaskRequest>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddTaskDialogData,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.task = this.data?.task;
    this.cdr.detectChanges();
    this.mode = this.data?.mode || 'add';
  }

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

  handleEditedTask(editedTask: TaskResponse) {
    this.dialogRef.close(editedTask);
  }

  handleAddedTask(addedTask: TaskResponse) {
    this.dialogRef.close(addedTask);
  }

  handleDeletedTask(deletedTaskId: number) {
    this.dialogRef.close(deletedTaskId);
  }
}
