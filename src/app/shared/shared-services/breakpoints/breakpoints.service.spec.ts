import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { BreakpointsService } from "./breakpoints.service";

describe("BreakpointsService", () => {
	let service: BreakpointsService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [BreakpointsService] });
		service = TestBed.inject(BreakpointsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
