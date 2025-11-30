import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { FeedbackService } from "./feedback.service";

describe("FeedbackService", () => {
	let service: FeedbackService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FeedbackService],
		});
		service = TestBed.inject(FeedbackService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
