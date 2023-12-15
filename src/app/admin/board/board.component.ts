import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CdkDropList, DropListOrientation } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Observable, Subject, firstValueFrom, take } from 'rxjs';


import { BoardModule } from './board.module';
import { BoardService } from './board.service';
import { BoardResponse } from 'src/app/shared/models/board.model';
import { ListResponse } from 'src/app/shared/models/list.model';
import { TaskResponse } from 'src/app/shared/models/task.model';
import { AddListComponent } from 'src/app/shared/shared-components/dialogs/add-list/add-list.component';

export declare type ListDirection = -1 | 1;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [BoardModule]
})
export class BoardComponent implements AfterViewInit {
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  changingListName$: Subject<boolean> = new Subject();

  draggingDisabled = true;

  orientation : DropListOrientation = "vertical";

  backlog: TaskResponse[] = [];
  backlog$ !: Observable<TaskResponse[]>;
  private _board !: BoardResponse | null;
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
    // TODO UDPATE POSITION SAME LIST
    // TODO UPDATE POSITION OTHER LIST CONSTRAIN CHECK here put it at last then move it
    if (event.previousContainer === event.container) {
      console.log("Before Move : ", event);
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("After Move : ", event);
      const droppedTask = event.container.data[event.previousIndex];
      const swapTask = event.container.data[event.currentIndex];
      console.log("droppedTask : ", droppedTask, "swapTask : ", swapTask);

      this.boardService.scrumTasks.updateTask$(droppedTask['id'], { position: swapTask.position })
        .subscribe((value: any) => this.handleEditedTask(droppedTask));

    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
      const droppedTask = event.previousContainer.data[event.previousIndex];
      const swapTask = event.container.data[event.currentIndex];
      console.log("droppedTask : ", droppedTask, "swapTask : ", swapTask);
      this.boardService.scrumTasks.updateTask$(droppedTask['id'], { list: list?.id || null, position: swapTask?.position })
        .subscribe((value: any) => this.handleEditedTask(droppedTask));
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

  handleEditedTask(editedTask?: TaskResponse) {
    this.boardService.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
  }

  async clearBacklog() {
    for (let index = 0; index < this.backlog.length; index++) {
      const task = this.backlog[index];
      await firstValueFrom(this.boardService.scrumTasks.deleteTask$(task.id));
    }
    this.boardService.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
  }

  async deleteList(listId: number) {
    await firstValueFrom(this.boardService.scrumList.deleteList$(listId));
    this.boardService.scrumTasks.getBacklog$().subscribe(values => this.backlog = values);
    this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
  }

  editListTitle() {
    this.changingListName$.next(true);
  }

  updateListName(newListName: string, list: ListResponse) {
    list.name = newListName;
    this.boardService.scrumList.updateList$(list.id, list).subscribe(
      {
        next: (listUpdate) => console.log(listUpdate),
        error: (err) => console.error(err)
      }
    )
  }

  set board(board: BoardResponse | null) {
    board?.lists.sort((a: ListResponse, b: ListResponse) => a.position - b.position);
    this._board = board;
  }

  get board(): BoardResponse | null {
    return this._board;
  }

  setPosition(list: ListResponse, direction: ListDirection) {
    list.position += direction;
    this.boardService.scrumList.updateList$(list.id, list)
      .subscribe(
        {
          next: () => {
            this.boardService.scrumBoards.getBoards$().subscribe(boards => this.board = boards[0]);
          },
          error: (e) => console.error(e)
        }
      )
  }
}
