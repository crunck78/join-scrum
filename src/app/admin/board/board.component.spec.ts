import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuHarness } from "@angular/material/menu/testing";
import { Observable, of, tap } from "rxjs";
import { Mock } from "vitest";
import { BoardResponse } from "../../shared/models/board.model";
import { TaskRequest, TaskResponse } from "../../shared/models/task.model";
import {
	createBoardResponse,
	createCategoryResponse,
	createListResponse,
	createTaskResponse,
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

	it("should create component", () => {
		getBoardServiceSpy.mockReturnValue(of(null));
		getBacklogServiceSpy.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		expect(component).toBeDefined();
	});

	it("should create board", async () => {
		const board = createBoardResponse({ title: "First Board" });

		getBoardServiceSpy.mockReturnValue(of(null));
		getBacklogServiceSpy.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		const addBoardServiceSpy = vi.spyOn(boardService, "addBoard$");
		addBoardServiceSpy.mockReturnValue(of(board));

		const addBoardButton: HTMLElement = fixture.nativeElement.querySelector(
			'button[aria-label="Add Board"]',
		);

		expect(getBoardServiceSpy).toBeCalledTimes(1);
		expect(addBoardButton).toBeTruthy();

		const addBoardSpy = vi.spyOn(component, "addBoard");
		addBoardButton.click();

		await fixture.whenStable();

		expect(addBoardSpy).toBeCalledTimes(1);
		expect(addBoardServiceSpy).toBeCalledTimes(1);
		expect(component.board).toEqual(board);

		const buttonAfterClick = fixture.nativeElement.querySelector(
			'button[aria-label="Add Board"]',
		);
		expect(buttonAfterClick).toBeFalsy();

		const buttonAddList = fixture.nativeElement.querySelector(
			'button[aria-label="Add List"]',
		);
		expect(buttonAddList).toBeTruthy();
	});

	it("should create list", async () => {
		const board = createBoardResponse({ title: "First Board" });
		const list = createListResponse();
		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		const addListServiceSpy = vi.spyOn(boardService, "addList$");
		addListServiceSpy.mockReturnValue(
			of(list).pipe(
				tap({
					next: () => {
						board.lists.push(list);
						getBoardServiceSpy.mockReturnValue(of(board));
					},
				}),
			),
		);

		const buttonAddList = fixture.nativeElement.querySelector(
			'button[aria-label="Add List"]',
		);
		expect(buttonAddList).toBeTruthy();

		const addListSpy = vi.spyOn(component, "addList");
		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		buttonAddList.click();

		await fixture.whenStable();
		expect(addListSpy).toBeCalledTimes(1);
		expect(addListServiceSpy).toBeCalledTimes(1);
		expect(refreshBoardSpy).toBeCalledTimes(1);
	});

	it("should update list name", async () => {
		const list = createListResponse();
		const board = createBoardResponse({ title: "First Board", lists: [list] });
		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		const updateListNameSpy = vi.spyOn(component, "updateListName");

		const headings: NodeListOf<HTMLHeadingElement> =
			fixture.nativeElement.querySelectorAll("h3");
		console.log(headings);

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
		expect(updateListNameSpy).toBeCalledTimes(1);
		expect(updateListNameSpy).toBeCalledWith(
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
		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of([]));
		fixture.autoDetectChanges();

		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		const deleteListServiceSpy = vi.spyOn(boardService, "deleteList$");
		deleteListServiceSpy.mockReturnValue(
			of(true).pipe(
				tap({
					next: () => {
						board.lists.splice(board.lists.indexOf(list), 1);
						getBoardServiceSpy.mockReturnValue(of(board));
					},
				}),
			),
		);

		const deleteListSpy = vi.spyOn(component, "deleteList");
		const buttonListMenu = fixture.nativeElement.querySelector(
			'button[aria-label="List Menu"]',
		);

		expect(buttonListMenu).toBeTruthy();

		buttonListMenu.click();

		const matMenus = await loader.getAllHarnesses(MatMenuHarness);
		for (let index = 0; index < matMenus.length; index++) {
			const menu = matMenus[index];
			if (await menu.isOpen()) {
				const items = await menu.getItems();
				for (let index = 0; index < items.length; index++) {
					const item = items[index];
					if ((await item.getText()) === "Delete List") {
						await item.click();
					}
				}
			}
		}

		expect(deleteListSpy).toBeCalledTimes(1);
		expect(deleteListSpy).toBeCalledWith(list.id);
		expect(refreshBoardSpy).toBeCalledTimes(1);
		expect(deleteListServiceSpy).toBeCalledTimes(1);
		expect(deleteListServiceSpy).toBeCalledWith(list.id);
		expect(component.board).toEqual(board);
	});

	it("should clear backlog", async () => {
		const task = createTaskResponse({ title: "Todo", category: createCategoryResponse() });
		const backlog: TaskResponse[] = [task];
		const board = createBoardResponse({ title: "First Board" });
		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of(backlog));
		fixture.autoDetectChanges();

		const refreshBoardSpy = vi.spyOn(component, "refreshBoard");
		const deleteTaskServiceSpy = vi.spyOn(boardService, "deleteTask$");
		deleteTaskServiceSpy.mockReturnValue(
			of(true).pipe(
				tap({
					next: () => {
						backlog.splice(backlog.indexOf(task), 1);
						getBacklogServiceSpy.mockReturnValue(of(backlog));
					},
				}),
			),
		);

		const clearBacklogSpy = vi.spyOn(component, "clearBacklog");

		const buttonBacklogMenu = fixture.nativeElement.querySelector(
			'button[aria-label="Backlog Menu"]',
		);

		expect(buttonBacklogMenu).toBeTruthy();

		buttonBacklogMenu.click();

		const matMenus = await loader.getAllHarnesses(MatMenuHarness);
		for (let index = 0; index < matMenus.length; index++) {
			const menu = matMenus[index];
			if (await menu.isOpen()) {
				const items = await menu.getItems();
				for (let index = 0; index < items.length; index++) {
					const item = items[index];
					if ((await item.getText()) === "Clear Backlog") {
						await item.click();
					}
				}
			}
		}

		expect(clearBacklogSpy).toBeCalledTimes(1);
		expect(deleteTaskServiceSpy).toBeCalledTimes(1);
		expect(deleteTaskServiceSpy).toBeCalledWith(task.id);
		expect(refreshBoardSpy).toBeCalledTimes(1);
		expect(component.backlog).toEqual(backlog);
	});

	it("should drop task from backlog to list", async () => {
		const task = createTaskResponse({ title: "Todo", category: createCategoryResponse() });
		const backlog: TaskResponse[] = [task];
		const list = createListResponse();
		const board = createBoardResponse({ title: "First Board", lists: [list] });

		getBoardServiceSpy.mockReturnValue(of(board));
		getBacklogServiceSpy.mockReturnValue(of(backlog));
		fixture.autoDetectChanges();

		const updateTaskServiceSpy = vi.spyOn(boardService, "updateTask$");
		updateTaskServiceSpy.mockReturnValue(
			of(task).pipe(
				tap({
					next: () => {
						backlog.splice(backlog.indexOf(task), 1);
						list.tasks.push(task);
						getBacklogServiceSpy.mockReturnValue(of(backlog));
						getBoardServiceSpy.mockReturnValue(of(board));
					},
				}),
			),
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
		expect(updateTaskServiceSpy).toBeCalledWith(task.id, expectedTaskRequest);

		expect(component.board?.lists[0].tasks.length).toBe(1);
		expect(component.backlog.length).toBe(0);
		expect(component.board?.lists[0].tasks[0]).toEqual(task);
	});
});
