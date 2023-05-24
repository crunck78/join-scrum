import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { TaskResponse } from '../../models/task.model';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContactInitialsComponent,
  ]
})
export class TaskComponent {
  @Input() task!: TaskResponse;

  get doneSubtasksLength(){
    return this.task.subtasks.filter(s => s.done).length;
  }

  @HostListener('click', ['$event'])
  onClick(event : any){
    console.log(event, this.task);
  }
}
