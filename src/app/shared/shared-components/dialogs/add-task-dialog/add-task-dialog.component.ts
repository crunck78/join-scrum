import { Component, EventEmitter } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { AddTaskComponent, TaskMode } from 'src/app/admin/add-task/add-task.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/shared/models/task.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    DialogComponent,
    AddTaskComponent
  ]
})
export class AddTaskDialogComponent {
  task!: TaskResponse;
  mode: TaskMode = 'add';
  formStatus!: FormControlStatus;
  clearTaskForm = new EventEmitter();
  submitTaskForm = new EventEmitter();
  constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>) {

  }

  updateFormStatus(eventStatus: FormControlStatus){
    this.formStatus = eventStatus;
  }

  get title(){
    if(this.mode == 'add')
      return 'Add Task';
    if(this.mode == 'edit')
      return 'Save Task';
    return '';
  }
}
