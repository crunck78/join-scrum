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
import { Board, BoardRequest } from "../../shared/models/board.model";
import {
	createBoardResponseAPI,
	createCategoryResponseAPI,
	createContactResponseAPI,
	createListResponseAPI,
	createSubtaskResponseAPI,
	createTaskResponseAPI,
} from "../../testing/fixtures";
import { BOARDS_ENDPOINT, ScrumBoardsService } from "./scrum-boards.service";

const mockAssignee = createContactResponseAPI();
const mockCategory = createCategoryResponseAPI();
const mockSubtask = createSubtaskResponseAPI();
const mockTask = createTaskResponseAPI({
	assignees: [mockAssignee],
	category: mockCategory,
	subtasks: [mockSubtask],
});
const mockList = createListResponseAPI({ tasks: [mockTask] });
const mockBoard = createBoardResponseAPI({ lists: [mockList] });
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
