import {
	type CdkDragDrop,
	CdkDropList,
	type DropListOrientation,
} from "@angular/cdk/drag-drop";
import { Component, inject, type QueryList, ViewChildren } from "@angular/core";
import { firstValueFrom, type Observable, Subject, take } from "rxjs";
import { BoardResponse } from "../../shared/models/board.model";
import { ListResponse } from "../../shared/models/list.model";
import { TaskRequest, TaskResponse } from "../../shared/models/task.model";
import { AddListComponent } from "../../shared/shared-components/dialogs/add-list/add-list.component";
import { BoardModule } from "./board.module";
import { BoardService } from "./board.service";

export declare type ListDirection = -1 | 1;

@Component({
	selector: "app-board",
	templateUrl: "./board.component.html",
	styleUrls: ["./board.component.scss"],
	imports: [BoardModule],
})
export class BoardComponent {
	private boardService = inject(BoardService);

	draggingDisabled = true;
	orientation: DropListOrientation = "vertical";
	backlog: TaskResponse[] = [];
	boards$: Observable<BoardResponse[]>;

	@ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

	changingListName$: Subject<boolean> = new Subject();
	backlog$!: Observable<TaskResponse[]>;
	private _board!: BoardResponse | null;

	set board(board: BoardResponse | null) {
		this._board = board;
	}

	get board(): BoardResponse | null {
		return this._board;
	}

	get matchWebBreakpoint$() {
		return this.boardService.breakPoints.matchesWebBreakpoint$;
	}

	constructor() {
		this.boards$ = this.boardService.boards$;
		this.backlog$ = this.boardService.backlog$;
		this.updateBoard();
	}

	private updateBoard() {
		this.backlog$.pipe(take(1)).subscribe((values) => (this.backlog = values));
		this.boards$.pipe(take(1)).subscribe((boards) => (this.board = boards[0]));
	}

	drop(event: CdkDragDrop<TaskResponse[]>, list?: ListResponse) {
		let droppedTask: TaskResponse;
		let swapTask: TaskResponse;
		let taskRequest: Partial<TaskRequest>;

		if (event.previousContainer === event.container) {
			droppedTask = event.container.data[event.previousIndex];
			swapTask = event.container.data[event.currentIndex];
			taskRequest = { position: swapTask.position } as Partial<TaskRequest>;
		} else {
			droppedTask = event.previousContainer.data[event.previousIndex];
			swapTask = event.container.data[event.currentIndex];
			taskRequest = { list: list?.id || null, position: swapTask?.position };
		}

		this.boardService.scrumTasks
			.updateTask$(droppedTask["id"], taskRequest)
			.pipe(take(1))
			.subscribe(() => this.handleEditedTask(droppedTask));
	}

	addList() {
		const dialogRef = this.boardService.dialog.open(AddListComponent);
		dialogRef.afterClosed().subscribe((newList) => {
			if (!newList) return;
			this.boards$
				.pipe(take(1))
				.subscribe((boards) => (this.board = boards[0]));
		});
	}

	/**
	 * Change to a more complex form, for now new user should only have one board
	 */
	addBoard() {
		if (this.board) return;
		this.boardService.scrumBoards
			.addBoard$({ title: "First Board" })
			.pipe(take(1))
			.subscribe((board) => (this.board = board));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handleEditedTask(_editedTask?: TaskResponse) {
		this.updateBoard();
	}

	async clearBacklog() {
		for (let index = 0; index < this.backlog.length; index++) {
			const task = this.backlog[index];
			await firstValueFrom(this.boardService.scrumTasks.deleteTask$(task.id));
		}
		this.updateBoard();
	}

	async deleteList(listId: number) {
		await firstValueFrom(this.boardService.scrumList.deleteList$(listId));
		this.updateBoard();
	}

	editListTitle() {
		this.changingListName$.next(true);
	}

	updateListName(newListName: string, list: ListResponse) {
		list.name = newListName;
		this.boardService.scrumList
			.updateList$(list.id, list)
			.pipe(take(1))
			.subscribe((listUpdate) => {
				if (listUpdate)
					this.boardService.feedbackService.openSnackBar("List Updated", "Ok");
				else
					this.boardService.feedbackService.openSnackBar(
						"List Name Update Failed!",
						"Try Again",
					);
			});
	}

	setPosition(list: ListResponse, direction: ListDirection) {
		list.position += direction;
		this.boardService.scrumList
			.updateList$(list.id, list)
			.pipe(take(1))
			.subscribe((listUpdate) => {
				if (!listUpdate) return;
				this.boards$
					.pipe(take(1))
					.subscribe((boards) => (this.board = boards[0]));
			});
	}
}
