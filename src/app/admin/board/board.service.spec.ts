import { TestBed } from "@angular/core/testing";
import { BoardService } from "./board.service";

describe("BoardService", () => {
	let service: BoardService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [BoardService],
		});
		service = TestBed.inject(BoardService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
