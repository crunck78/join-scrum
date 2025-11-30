import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { SummaryService } from "./summary.service";

describe("SummaryService", () => {
	let service: SummaryService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SummaryService],
		});
		service = TestBed.inject(SummaryService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
