import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { TaskResponse } from '../../models/task.model';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContactInitialsComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TaskComponent {
  @Input() task!: TaskResponse;

  constructor(private dialog: MatDialog) {

  }

  get doneSubtasksLength() {
    return this.task.subtasks.filter(s => s.done).length;
  }


  @HostListener('click', ['$event'])
  onClick(event: any) {
    console.log(event);
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
    dialogRef.componentInstance.task = this.task;
    dialogRef.componentInstance.mode = 'edit';

    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  editTask() {

  }

  deleteTask() {

  }
}
