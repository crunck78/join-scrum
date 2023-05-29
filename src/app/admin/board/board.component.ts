import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';
import { Observable } from 'rxjs';
import { ScrumBoardsService } from 'src/app/scrum-api/scrum-boards/scrum-boards.service';
import { TaskResponse } from 'src/app/shared/models/task.model';
import { BoardResponse } from 'src/app/shared/models/board.model';
import { AddListComponent } from 'src/app/shared/shared-components/dialogs/add-list/add-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ListResponse } from 'src/app/shared/models/list.model';
import { TaskComponent } from 'src/app/shared/shared-components/task/task.component';

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
    MatButtonModule,
    TaskComponent,
  ]
})
export class BoardComponent implements AfterViewInit {
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  draggingDisabled = false;

  backlog: TaskResponse[] = [];
  backlog$ !: Observable<TaskResponse[]>;
  board !: BoardResponse | null;
  constructor(private scrumTasks: ScrumTasksService,
    private dialog: MatDialog,
    private scrumBoards: ScrumBoardsService) {
    this.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this.scrumBoards.getBoardById$('1').subscribe(board => this.board = board);
  }
  ngAfterViewInit(): void {
    console.log(this.dropLists);
  }

  drop(event: CdkDragDrop<TaskResponse[]>, list?: ListResponse) {
    // this.draggingDisabled = true;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const droppedTask = event.container.data[event.currentIndex];
      this.scrumTasks.updateTask$(droppedTask['id'], { list: list?.id || null })
        .subscribe((value: any) => console.log(value));
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
  addBoard() {
    if (!this.board)
      this.scrumBoards.addBoard$({ title: "First Board" }).subscribe(board => this.board = board);
  }
}
