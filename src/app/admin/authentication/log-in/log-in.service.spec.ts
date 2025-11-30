import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { LogInService } from "./log-in.service";

describe("LogInService", () => {
	let service: LogInService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LogInService],
		});
		service = TestBed.inject(LogInService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
