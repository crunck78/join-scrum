import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { AddTaskComponent } from 'src/app/admin/add-task/add-task.component';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
  standalone: true,
  imports:[
    DialogComponent,
    AddTaskComponent
  ]
})
export class AddTaskDialogComponent {

}
