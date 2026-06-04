import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { it, Mock } from "vitest";
import { BoardResponse } from "../../shared/models/board.model";
import { TaskRequest, TaskResponse } from "../../shared/models/task.model";
import {
	clickElement,
	clickMenuItem,
	createBoardResponse,
	createCategoryResponse,
	createListResponse,
	createTaskResponse,
	getElement,
	mockWithSideEffect,
} from "../../testing/fixtures";
import { BoardComponent } from "./board.component";
import { BoardService } from "./board.service";

describe("BoardComponent", () => {
	let component: BoardComponent;
	let fixture: ComponentFixture<BoardComponent>;
	let boardService: BoardService;
	let getBoardServiceSpy: Mock<() => Observable<BoardResponse | null>>;
	let getBacklogServiceSpy: Mock<() => Observable<TaskResponse[]>>;

	let loader: HarnessLoader;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BoardComponent],
			providers: [BoardService],
		});
		boardService = TestBed.inject(BoardService);
		getBoardServiceSpy = vi.spyOn(boardService, "board$", "get");
		getBacklogServiceSpy = vi.spyOn(boardService, "backlog$", "get");

		fixture = TestBed.createComponent(BoardComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);

		component = fixture.componentInstance;
	});

	function setup(
		board: BoardResponse | null = null,
		backlog: TaskResponse[] = [],
	) {
		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of(backlog));
		fixture.autoDetectChanges();
	}

	it("should create component", () => {
		setup();
		expect(component).toBeDefined();
	});

	it("should create board", async () => {
		const board = createBoardResponse({ title: "First Board" });
		setup();

		const addBoardServiceSpy = vi.spyOn(boardService, "addBoard$");
		addBoardServiceSpy.mockReturnValue(of(board));

		expect(getBoardServiceSpy).toHaveBeenCalledTimes(1);

		const addBoardSpy = vi.spyOn(component, "addBoard");
		clickElement(fixture, 'button[aria-label="Add Board"]');

		await fixture.whenStable();

		expect(addBoardSpy).toHaveBeenCalledTimes(1);
		expect(addBoardServiceSpy).toHaveBeenCalledTimes(1);
		expect(component.board).toEqual(board);

		expect(getElement(fixture, 'button[aria-label="Add Board"]')).toBeFalsy();
		expect(getElement(fixture, 'button[aria-label="Add List"]')).toBeTruthy();
	});

	it("should create list", async () => {
		const board = createBoardResponse({ title: "First Board" });
		const list = createListResponse();
		setup(board);

		const addListServiceSpy = vi.spyOn(boardService, "addList$");
		addListServiceSpy.mockReturnValue(
			mockWithSideEffect(list, () => {
				board.lists.push(list);
				getBoardServiceSpy.mockReturnValue(of(board));
			}),
		);

		const addListSpy = vi.spyOn(component, "addList");
		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		clickElement(fixture, 'button[aria-label="Add List"]');

		await fixture.whenStable();
		expect(addListSpy).toHaveBeenCalledTimes(1);
		expect(addListServiceSpy).toHaveBeenCalledTimes(1);
		expect(refreshBoardSpy).toHaveBeenCalledTimes(1);
	});

	it("should update list name", async () => {
		const list = createListResponse();
		const board = createBoardResponse({ title: "First Board", lists: [list] });
		setup(board);

		const updateListNameSpy = vi.spyOn(component, "updateListName");

		const headings: NodeListOf<HTMLHeadingElement> =
			fixture.nativeElement.querySelectorAll("h3");

		const todoListHeading = Array.from(headings).find(
			(h) => h.textContent?.trim() === "TODO",
		);

		expect(todoListHeading).toBeTruthy();
		todoListHeading?.click();

		await fixture.whenStable();

		const input = document.activeElement as HTMLInputElement;

		expect(input).toBeTruthy();
		expect(input.tagName).toBe("INPUT");
		expect(input.getAttribute("aria-label")).toBe("Edit List name");
		expect(input.value).toBe("TODO");

		input.value = "IN PROGRESS";
		input.dispatchEvent(new Event("input"));
		input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

		await fixture.whenStable();
		expect(updateListNameSpy).toHaveBeenCalledTimes(1);
		expect(updateListNameSpy).toHaveBeenCalledWith(
			"IN PROGRESS",
			component.board?.lists[0],
		);

		const inProgressListHeading = Array.from(headings).find(
			(h) => h.textContent?.trim() === "IN PROGRESS",
		);

		expect(inProgressListHeading).toBeTruthy();
	});

	it("should delete list", async () => {
		const list = createListResponse();
		const board = createBoardResponse({ title: "First Board", lists: [list] });
		setup(board);

		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		const deleteListServiceSpy = vi.spyOn(boardService, "deleteList$");
		deleteListServiceSpy.mockReturnValue(
			mockWithSideEffect(true, () => {
				board.lists.splice(board.lists.indexOf(list), 1);
				getBoardServiceSpy.mockReturnValue(of(board));
			}),
		);

		const deleteListSpy = vi.spyOn(component, "deleteList");

		clickElement(fixture, 'button[aria-label="List Menu"]');

		await clickMenuItem(loader, "Delete List");

		expect(deleteListSpy).toHaveBeenCalledTimes(1);
		expect(deleteListSpy).toHaveBeenCalledWith(list.id);
		expect(refreshBoardSpy).toHaveBeenCalledTimes(1);
		expect(deleteListServiceSpy).toHaveBeenCalledTimes(1);
		expect(deleteListServiceSpy).toHaveBeenCalledWith(list.id);
		expect(component.board).toEqual(board);
	});

	it("should clear backlog", async () => {
		const task = createTaskResponse({
			title: "Todo",
			category: createCategoryResponse(),
		});
		const backlog: TaskResponse[] = [task];
		const board = createBoardResponse({ title: "First Board" });
		setup(board, backlog);

		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		const deleteTaskServiceSpy = vi.spyOn(boardService, "deleteTask$");
		deleteTaskServiceSpy.mockReturnValue(
			mockWithSideEffect(true, () => {
				backlog.splice(backlog.indexOf(task), 1);
				getBacklogServiceSpy.mockReturnValue(of(backlog));
			}),
		);

		const clearBacklogSpy = vi.spyOn(component, "clearBacklog");

		clickElement(fixture, 'button[aria-label="Backlog Menu"]');

		await clickMenuItem(loader, "Clear Backlog");

		expect(clearBacklogSpy).toHaveBeenCalledTimes(1);
		expect(deleteTaskServiceSpy).toHaveBeenCalledTimes(1);
		expect(deleteTaskServiceSpy).toHaveBeenCalledWith(task.id);
		expect(refreshBoardSpy).toHaveBeenCalledTimes(1);
		expect(component.backlog).toEqual(backlog);
	});

	it("should drop task from backlog to list", async () => {
		const task = createTaskResponse({
			title: "Todo",
			category: createCategoryResponse(),
		});
		const backlog: TaskResponse[] = [task];
		const list = createListResponse();
		const board = createBoardResponse({ title: "First Board", lists: [list] });

		setup(board, backlog);

		const updateTaskServiceSpy = vi.spyOn(boardService, "updateTask$");
		updateTaskServiceSpy.mockReturnValue(
			mockWithSideEffect(task, () => {
				backlog.splice(backlog.indexOf(task), 1);
				list.tasks.push(task);
				getBacklogServiceSpy.mockReturnValue(of(backlog));
				getBoardServiceSpy.mockReturnValue(of(board));
			}),
		);

		const fakeEvent = {
			previousContainer: { data: backlog },
			container: { data: board.lists[0].tasks },
			previousIndex: 0,
			currentIndex: 0,
			item: {},
			isPointerOverContainer: false,
			distance: {
				x: 0,
				y: 0,
			},
			dropPoint: {
				x: 0,
				y: 0,
			},
			event: new MouseEvent("drop"),
		} as CdkDragDrop<TaskResponse[]>;

		component.drop(fakeEvent, list);

		expect(updateTaskServiceSpy).toHaveBeenCalledTimes(1);
		const expectedTaskRequest: Partial<TaskRequest> = {
			list: list.id,
		};
		expect(updateTaskServiceSpy).toHaveBeenCalledWith(
			task.id,
			expectedTaskRequest,
		);

		expect(component.board?.lists[0].tasks.length).toBe(1);
		expect(component.backlog.length).toBe(0);
		expect(component.board?.lists[0].tasks[0]).toEqual(task);
	});
});
