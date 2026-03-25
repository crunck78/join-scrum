import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumBoardsService } from "../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../scrum-api/scrum-lists/scrum-lists.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { BoardResponse } from "../../shared/models/board.model";
import { ListResponse } from "../../shared/models/list.model";
import { TaskResponse } from "../../shared/models/task.model";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../shared/shared-services/feedback/feedback.service";
import { BoardService } from "./board.service";

const createBoard = (
	overrides: Partial<BoardResponse> = {},
): BoardResponse => ({
	title: "First Board",
	id: "1",
	lists: [],
	createdAt: new Date(),
	updatedAt: new Date(),
	...overrides,
});

const createList = (overrides: Partial<ListResponse> = {}): ListResponse => ({
	id: 1,
	name: "List 1",
	createdAt: new Date(),
	updatedAt: new Date(),
	tasks: [],
	position: 0,
	...overrides,
});

const createBacklog = (): TaskResponse[] => [
	{
		id: 1,
		title: "Task 1",
		description: "Task Description",
		category: {
			id: 1,
			name: "IT",
			color: "#fff",
			createdAt: new Date(),
			updateAt: new Date(),
		},
		dueDate: new Date(),
		assignees: [],
		priority: "Medium",
		position: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
		subtasks: [],
	},
];

describe("BoardService", () => {
	let service: BoardService;
	const getBoards$ = vi.fn();
	const addBoard$ = vi.fn();
	const getBacklog$ = vi.fn();
	const updateTask$ = vi.fn();
	const deleteTask$ = vi.fn();
	const deleteList$ = vi.fn();
	const updateList$ = vi.fn();
	const openSnackBar = vi.fn();
	const dialogOpen = vi.fn();
	const matchesWebBreakpoint$ = new Subject<boolean>();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
				{
					provide: ScrumBoardsService,
					useValue: { getBoards$, addBoard$ },
				},
				{
					provide: ScrumTasksService,
					useValue: { getBacklog$, updateTask$, deleteTask$ },
				},
				{
					provide: ScrumListsService,
					useValue: { deleteList$, updateList$ },
				},
				{
					provide: FeedbackService,
					useValue: { openSnackBar },
				},
				{
					provide: MatDialog,
					useValue: { open: dialogOpen },
				},
			],
		});

		service = TestBed.inject(BoardService);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("board$", () => {
		it("should return null when no boards exist", async () => {
			getBoards$.mockReturnValue(of([]));

			const result = await firstValueFrom(service.board$);

			expect(result).toBeNull();
		});

		it("should return the first board when boards exist", async () => {
			const board = createBoard();
			getBoards$.mockReturnValue(of([board]));

			const result = await firstValueFrom(service.board$);

			expect(result).toEqual(board);
		});
	});

	describe("backlog$", () => {
		it("should return empty list when backlog has no tasks", async () => {
			getBacklog$.mockReturnValue(of([]));

			const result = await firstValueFrom(service.backlog$);

			expect(result.length).toEqual(0);
		});

		it("should return tasks when backlog has tasks", async () => {
			const backlog = createBacklog();
			getBacklog$.mockReturnValue(of(backlog));

			const result = await firstValueFrom(service.backlog$);

			expect(result).toEqual(backlog);
		});
	});

	describe("boardLists$", () => {
		it("should return empty array when no board exists", async () => {
			getBoards$.mockReturnValue(of([]));

			const result = await firstValueFrom(service.boardLists$);

			expect(result).toEqual([]);
		});

		it("should return board lists when board exists", async () => {
			const list = createList();
			const board = createBoard({ lists: [list] });
			getBoards$.mockReturnValue(of([board]));

			const result = await firstValueFrom(service.boardLists$);

			expect(result).toEqual([list]);
		});
	});

	describe("matchWebBreakpoint$", () => {
		it("should return the breakpoints observable", () => {
			expect(service.matchWebBreakpoint$).toBe(matchesWebBreakpoint$);
		});
	});

	describe("updateTask$", () => {
		it("should delegate to scrumTasks and return result", async () => {
			const updated = createBacklog()[0];
			updateTask$.mockReturnValue(of(updated));

			const result = await firstValueFrom(
				service.updateTask$(1, { title: "Updated" }),
			);

			expect(updateTask$).toHaveBeenCalledWith(1, { title: "Updated" });
			expect(result).toEqual(updated);
		});
	});

	describe("deleteTask$", () => {
		it("should delegate to scrumTasks and return result", async () => {
			deleteTask$.mockReturnValue(of(null));

			const result = await firstValueFrom(service.deleteTask$(1));

			expect(deleteTask$).toHaveBeenCalledWith(1);
			expect(result).toBeNull();
		});
	});

	describe("deleteList$", () => {
		it("should delegate to scrumList and return result", async () => {
			deleteList$.mockReturnValue(of(1));

			const result = await firstValueFrom(service.deleteList$(1));

			expect(deleteList$).toHaveBeenCalledWith(1);
			expect(result).toEqual(1);
		});
	});

	describe("updateList", () => {
		it("should show success snackbar when update returns a list", () => {
			const list = createList();
			updateList$.mockReturnValue(of(list));

			service.updateList(list);

			expect(openSnackBar).toHaveBeenCalledWith("List Updated", "Ok");
		});

		it("should show failure snackbar when update returns null", () => {
			const list = createList();
			updateList$.mockReturnValue(of(null));

			service.updateList(list);

			expect(openSnackBar).toHaveBeenCalledWith(
				"List Name Update Failed!",
				"Try Again",
			);
		});
	});

	describe("setPosition$", () => {
		it("should delegate to scrumList updateList$ and return result", async () => {
			const list = createList();
			updateList$.mockReturnValue(of(list));

			const result = await firstValueFrom(service.setPosition$(list));

			expect(updateList$).toHaveBeenCalledWith(list.id, list);
			expect(result).toEqual(list);
		});
	});

	describe("addBoard$", () => {
		it("should delegate to scrumBoards and return new board", async () => {
			const board = createBoard();
			addBoard$.mockReturnValue(of(board));

			const result = await firstValueFrom(service.addBoard$());

			expect(addBoard$).toHaveBeenCalledWith({ title: "First Board" });
			expect(result).toEqual(board);
		});
	});

	describe("addList$", () => {
		it("should show success snackbar and return new list when dialog confirms", async () => {
			const list = createList();
			dialogOpen.mockReturnValue({ afterClosed: () => of(list) });

			const result = await firstValueFrom(service.addList$());

			expect(openSnackBar).toHaveBeenCalledWith("List Created", "Ok");
			expect(result).toEqual(list);
		});

		it("should show failure snackbar and return undefined when dialog is dismissed", async () => {
			dialogOpen.mockReturnValue({ afterClosed: () => of(undefined) });

			const result = await firstValueFrom(service.addList$());

			expect(openSnackBar).toHaveBeenCalledWith(
				"List Creation Failed!",
				"Try Again",
			);
			expect(result).toBeUndefined();
		});
	});
});
