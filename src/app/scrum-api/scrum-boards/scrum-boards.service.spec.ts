import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import {
	Board,
	BoardRequest,
	BoardResponseAPI,
} from "../../shared/models/board.model";
import { CategoryResponseAPI } from "../../shared/models/category.model";
import { ContactResponseAPI } from "../../shared/models/contact.model";
import { ListResponseAPI } from "../../shared/models/list.model";
import { SubtaskResponseAPI } from "../../shared/models/subtask.model";
import { TaskResponseAPI } from "../../shared/models/task.model";
import { BOARDS_ENDPOINT, ScrumBoardsService } from "./scrum-boards.service";

const mockAssignee: ContactResponseAPI = {
	created_at: "",
	email: "test.user@example.local",
	id: 1,
	name: "John Doe",
	phone_number: "01555555555",
	updated_at: "",
};

const mockCategory: CategoryResponseAPI = {
	color: "#ffffff",
	created_at: "",
	id: 1,
	name: "IT",
	update_at: "",
};

const mockSubtask: SubtaskResponseAPI = {
	created_at: "",
	done: false,
	id: 1,
	title: "Unit tests",
	updated_at: "",
};

const mockTask: TaskResponseAPI = {
	assignees: [mockAssignee],
	category: mockCategory,
	created_at: "",
	description: "Some Bug to fix",
	due_date: "",
	id: 1,
	position: 1,
	priority: "Low",
	subtasks: [mockSubtask],
	title: "Fix the bug",
	updated_at: "",
};

const mockList: ListResponseAPI = {
	created_at: "",
	updated_at: "",
	id: 1,
	tasks: [mockTask],
	name: "Todo",
	position: 1,
};

const mockBoard: BoardResponseAPI = {
	title: "Board Title",
	id: "1",
	created_at: "",
	updated_at: "",
	lists: [mockList],
};

const mockBoardRequest: BoardRequest = { title: "New Board" };

describe("ScrumBoardsService", () => {
	let service: ScrumBoardsService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumBoardsService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getBoards$", () => {
		it("should return mapped boards on success", async () => {
			const resultPromise = firstValueFrom(service.getBoards$());
			const req = httpTesting.expectOne(
				BOARDS_ENDPOINT,
				"Request to load boards",
			);
			expect(req.request.method).toBe("GET");

			req.flush([mockBoard]);

			expect(await resultPromise).toEqual([
				Board.createInternalValue(mockBoard),
			]);
		});

		it("should return empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getBoards$());
			const req = httpTesting.expectOne(
				BOARDS_ENDPOINT,
				"Request to load boards",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("addBoard$", () => {
		it("should return mapped board on success", async () => {
			const resultPromise = firstValueFrom(service.addBoard$(mockBoardRequest));
			const req = httpTesting.expectOne(
				BOARDS_ENDPOINT,
				"Request to add board",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Board.createRepresentation(mockBoardRequest),
			);

			req.flush(mockBoard);

			expect(await resultPromise).toEqual(Board.createInternalValue(mockBoard));
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(service.addBoard$(mockBoardRequest));
			const req = httpTesting.expectOne(
				BOARDS_ENDPOINT,
				"Request to add board",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("getBoardById$", () => {
		it("should return mapped board on success", async () => {
			const boardId = "1";
			const resultPromise = firstValueFrom(service.getBoardById$(boardId));
			const req = httpTesting.expectOne(
				`${BOARDS_ENDPOINT}${boardId}/`,
				"Request to get board by id",
			);
			expect(req.request.method).toBe("GET");

			req.flush(mockBoard);

			expect(await resultPromise).toEqual(Board.createInternalValue(mockBoard));
		});

		it("should return null on error", async () => {
			const boardId = "1";
			const resultPromise = firstValueFrom(service.getBoardById$(boardId));
			const req = httpTesting.expectOne(
				`${BOARDS_ENDPOINT}${boardId}/`,
				"Request to get board by id",
			);

			req.flush("Not found", { status: 404, statusText: "Not Found" });

			expect(await resultPromise).toBeNull();
		});
	});
});
