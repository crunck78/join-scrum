import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Observable } from 'rxjs';


import { BoardModule } from './board.module';
import { BoardService } from './board.service';
import { BoardResponse } from 'src/app/shared/models/board.model';
import { ListResponse } from 'src/app/shared/models/list.model';
import { TaskResponse } from 'src/app/shared/models/task.model';
import { AddListComponent } from 'src/app/shared/shared-components/dialogs/add-list/add-list.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [BoardModule]
})
export class BoardComponent implements AfterViewInit {
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  draggingDisabled = true;

  backlog: TaskResponse[] = [];
  backlog$ !: Observable<TaskResponse[]>;
  board !: BoardResponse | null;
  constructor(private boardService: BoardService) {
    this.boardService.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    // this.boardService.scrumBoards.getBoardById$('3').subscribe(board => this.board = board);
    this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
  }
  ngAfterViewInit(): void {
    console.log("DropLists: ", this.dropLists);
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
      this.boardService.scrumTasks.updateTask$(droppedTask['id'], { list: list?.id || null })
        .subscribe((value: any) => console.log(value));
    }
  }

  addList() {
    const dialogRef = this.boardService.dialog.open(AddListComponent);
    dialogRef.afterClosed().subscribe(newList => {
      if (newList) {
        console.log(newList);
        this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
      }
    });
  }

  /**
   * Change to a more complex form, for now new user should only have one board
   */
  addBoard() {
    if (!this.board)
      this.boardService.scrumBoards.addBoard$({ title: "First Board" }).subscribe(board => this.board = board);
  }

  get matchWebBreakpoint$() {
    return this.boardService.breakPoints.matchesWebBreakpoint$;
  }

  handleEditedTask(editedTask: TaskResponse) {
    debugger;
    this.boardService.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this, this.boardService.scrumBoards.getBoardById$('1').subscribe(board => this.board = board);
  }
}
