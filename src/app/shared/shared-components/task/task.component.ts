import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskResponse } from '../../models/task.model';
import { MaterialModule } from '../../modules/material/material.module';
import { ProgressLinearGradientPipe } from '../../pipes/progress-linear-gradient/progress-linear-gradient.pipe';
import { ContactInitialsComponent } from '../contact-initials/contact-initials.component';
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContactInitialsComponent,
    MaterialModule,
    ProgressLinearGradientPipe
  ]
})
export class TaskComponent {
  @Input() task!: TaskResponse;
  @Output() taskChange = new EventEmitter<TaskResponse>();

  constructor(private dialog: MatDialog) {

  }

  get doneSubtasksLength() {
    return this.task.subtasks.filter(s => s.done).length;
  }


  @HostListener('click', ['$event'])
  onClick() {
    this.editTask();
  }

  editTask() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent,
      {
        data: { task: this.task, mode: 'edit' }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.taskChange.emit(result);
    });
  }
}
