import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumBoardsService } from "./scrum-boards.service";

describe("ScrumBoardsService", () => {
	let service: ScrumBoardsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumBoardsService],
		});
		service = TestBed.inject(ScrumBoardsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
