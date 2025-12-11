import { TestBed } from "@angular/core/testing";
import type { CanActivateFn } from "@angular/router";

import { loginGuard } from "./log-in.guard";

describe("LogInGuard", () => {
	let guard: CanActivateFn;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = loginGuard;
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
