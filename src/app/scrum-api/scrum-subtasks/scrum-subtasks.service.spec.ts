import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumSubtasksService } from "./scrum-subtasks.service";

describe("ScrumSubtasksService", () => {
	let service: ScrumSubtasksService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumSubtasksService],
		});
		service = TestBed.inject(ScrumSubtasksService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
