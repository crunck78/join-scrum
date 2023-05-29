import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { AddTaskComponent } from 'src/app/admin/add-task/add-task.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskResponse } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    AddTaskComponent
  ]
})
export class AddTaskDialogComponent {
  task!: TaskResponse;
  mode: 'add' | 'edit' = 'add';
  constructor(private dialogRef: MatDialogRef<AddTaskDialogComponent>) {

  }

  get title(){
    if(this.mode == 'add')
      return 'Add Task';
    if(this.mode == 'edit')
      return 'Edit Task';
    return '';
  }
}
