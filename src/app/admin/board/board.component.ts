import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ScrumTasksService, TaskResponse } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    PageTitleComponent,
    DragDropModule,
    MatButtonModule
  ]
})
export class BoardComponent {
  todo : TaskResponse[] = [];

  done : TaskResponse[] = [];

  backlog : TaskResponse[] = [];
  backlog$ !: Observable<TaskResponse[]>;
  constructor(private scrumTasks: ScrumTasksService){
   this.scrumTasks.getBacklog$().subscribe(values => {
    this.backlog = values;
    console.log(values);
   });
  }

  drop(event: CdkDragDrop<TaskResponse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addList(){

  }
}
