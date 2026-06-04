import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumBoardsService } from "../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../scrum-api/scrum-lists/scrum-lists.service";
import { ScrumTasksService } from "../../scrum-api/scrum-tasks/scrum-tasks.service";
import { TaskResponse } from "../../shared/models/task.model";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { FeedbackService } from "../../shared/shared-services/feedback/feedback.service";
import {
	createBoardResponse,
	createListResponse,
} from "../../testing/fixtures";
import { BoardService } from "./board.service";

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
			updatedAt: new Date(),
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
		const board = createBoardResponse();
		const scenarios = [
			{
				description: "should return null when no boards exist",
				boards: [],
				expected: null,
			},
			{
				description: "should return the first board when boards exist",
				boards: [board],
				expected: board,
			},
		];

		it.each(scenarios)("$description", async ({ boards, expected }) => {
			getBoards$.mockReturnValue(of(boards));
			const result = await firstValueFrom(service.board$);
			expect(result).toEqual(expected);
		});
	});

	describe("backlog$", () => {
		const backlog = createBacklog();
		const scenarios = [
			{
				description: "should return empty list when backlog has no tasks",
				backlog: [],
				expected: [],
			},
			{
				description: "should return tasks when backlog has tasks",
				backlog: backlog,
				expected: backlog,
			},
		];

		it.each(scenarios)("$description", async ({ backlog, expected }) => {
			getBacklog$.mockReturnValue(of(backlog));
			const result = await firstValueFrom(service.backlog$);
			expect(result).toEqual(expected);
		});
	});

	describe("boardLists$", () => {
		const list = createListResponse();
		const board = createBoardResponse({ lists: [list] });
		const scenarios = [
			{
				description: "should return empty array when no board exists",
				boards: [],
				expected: [],
			},
			{
				description: "should return board lists when board exists",
				boards: [board],
				expected: [list],
			},
		];

		it.each(scenarios)("$description", async ({ boards, expected }) => {
			getBoards$.mockReturnValue(of(boards));

			const result = await firstValueFrom(service.boardLists$);

			expect(result).toEqual(expected);
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
		const scenarios = [
			{
				description: "should show success snackbar when update returns a list",
				updateListResponse: createListResponse(),
				expected: ["List Updated", "Ok"],
			},
			{
				description: "should show failure snackbar when update returns null",
				updateListResponse: null,
				expected: ["List Name Update Failed!", "Try Again"],
			},
		];
		it.each([scenarios])("$description", ({ updateListResponse, expected }) => {
			updateList$.mockReturnValue(of(updateListResponse));

			service.updateList(createListResponse());

			expect(openSnackBar).toHaveBeenCalledWith(...expected);
		});
	});

	describe("setPosition$", () => {
		it("should delegate to scrumList updateList$ and return result", async () => {
			const list = createListResponse();
			updateList$.mockReturnValue(of(list));

			const result = await firstValueFrom(service.setPosition$(list));

			expect(updateList$).toHaveBeenCalledWith(list.id, list);
			expect(result).toEqual(list);
		});
	});

	describe("addBoard$", () => {
		it("should delegate to scrumBoards and return new board", async () => {
			const board = createBoardResponse();
			addBoard$.mockReturnValue(of(board));

			const result = await firstValueFrom(service.addBoard$());

			expect(addBoard$).toHaveBeenCalledWith({ title: "First Board" });
			expect(result).toEqual(board);
		});
	});

	describe("addList$", () => {
		const list = createListResponse();
		const scenarios = [
			{
				description:
					"should show success snackbar and return new list when dialog confirms",
				dialogAfterClosedValue: list,
				expectedSnackBar: ["List Created", "Ok"],
				expectedAddListValue: list,
			},
			{
				description:
					"should show failure snackbar and return undefined when dialog is dismissed",
				dialogAfterClosedValue: undefined,
				expectedSnackBar: ["List Creation Failed!", "Try Again"],
				expectedAddListValue: undefined,
			},
		];

		it.each(scenarios)("$description", async ({
			dialogAfterClosedValue,
			expectedSnackBar,
			expectedAddListValue,
		}) => {
			dialogOpen.mockReturnValue({
				afterClosed: () => of(dialogAfterClosedValue),
			});

			const result = await firstValueFrom(service.addList$());

			expect(openSnackBar).toHaveBeenCalledWith(...expectedSnackBar);
			expect(result).toEqual(expectedAddListValue);
		});
	});
});
