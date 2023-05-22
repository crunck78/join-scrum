import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';
import { Observable } from 'rxjs';
import { ScrumBoardsService } from 'src/app/scrum-api/scrum-boards/scrum-boards.service';
import { TaskResponse } from 'src/app/shared/models/task.model';
import { BoardResponse } from 'src/app/shared/models/board.model';
import { AddListComponent } from 'src/app/shared/shared-components/dialogs/add-list/add-list.component';
import { MatDialog } from '@angular/material/dialog';

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
  todo: TaskResponse[] = [];

  done: TaskResponse[] = [];

  backlog: TaskResponse[] = [];
  backlog$ !: Observable<TaskResponse[]>;
  board !: BoardResponse | null;
  constructor(private scrumTasks: ScrumTasksService,
    private dialog: MatDialog,
    private scrumBoards: ScrumBoardsService) {
    this.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this.scrumBoards.getBoardById$('1').subscribe(board => this.board = board);
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

  addList() {
    const dialogRef = this.dialog.open(AddListComponent);
    dialogRef.afterClosed().subscribe(newList => {
      if (newList) {
        console.log(newList);
        //this.updateContacts();
      }
    });
  }

  /**
   * Change to a more complex form, for now new user should only have one board
   */
  addBoard(){
    if(!this.board)
      this.scrumBoards.addBoard$({title: "First Board"}).subscribe(board => this.board = board);
  }
}
