import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumSummaryService } from "./scrum-summary.service";

describe("ScrumSummaryService", () => {
	let service: ScrumSummaryService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumSummaryService],
		});
		service = TestBed.inject(ScrumSummaryService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
