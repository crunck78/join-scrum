import {
	type CdkDragDrop,
	CdkDropList,
	type DropListOrientation,
} from "@angular/cdk/drag-drop";
import {
	Component,
	inject,
	OnInit,
	type QueryList,
	ViewChildren,
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BoardResponse } from "../../shared/models/board.model";
import { ListResponse } from "../../shared/models/list.model";
import { TaskRequest, TaskResponse } from "../../shared/models/task.model";
import { BoardModule } from "./board.module";
import { BoardService } from "./board.service";

export declare type ListDirection = -1 | 1;

@Component({
	selector: "app-board",
	templateUrl: "./board.component.html",
	styleUrls: ["./board.component.scss"],
	imports: [BoardModule],
})
export class BoardComponent implements OnInit {
	private boardService = inject(BoardService);
	orientation: DropListOrientation = "vertical";
	@ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

	get matchWebBreakpoint$() {
		return this.boardService.matchWebBreakpoint$;
	}

	board: BoardResponse | null = null;
	backlog: TaskResponse[] = [];

	ngOnInit() {
		this.refreshBoard();
	}

	refreshBoard() {
		this.boardService.board$.subscribe((board) => (this.board = board));
		this.boardService.backlog$.subscribe((backlog) => (this.backlog = backlog));
	}

	/**
	 * Change to a more complex form, for now new user should only have one board
	 */
	addBoard() {
		if (this.board) return;
		this.boardService.addBoard$().subscribe((board) => (this.board = board));
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

		this.boardService
			.updateTask$(droppedTask["id"], taskRequest)
			.subscribe(() => this.refreshBoard());
	}

	addList() {
		// TODO: this is a problem with multi boards. The new list is added by the dialog
		// User can choose a board were to add the list. If a diff Board is selected,
		// the new list will appear in a diff board as the one in the view.
		this.boardService.addList$().subscribe((newList) => {
			if (newList) this.refreshBoard();
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handleEditedTask(_editedTask?: TaskResponse) {
		this.refreshBoard();
	}

	async clearBacklog() {
		for (let index = 0; index < this.backlog.length; index++) {
			const task = this.backlog[index];
			await firstValueFrom(this.boardService.deleteTask$(task.id));
		}
		this.refreshBoard();
	}

	async deleteList(listId: number) {
		await firstValueFrom(this.boardService.deleteList$(listId));
		this.refreshBoard();
	}

	updateListName(newListName: string, list: ListResponse) {
		list.name = newListName;
		this.boardService.updateList(list);
	}

	setPosition(list: ListResponse, direction: ListDirection) {
		list.position += direction;
		this.boardService.setPosition$(list).subscribe(() => this.refreshBoard());
	}
}
