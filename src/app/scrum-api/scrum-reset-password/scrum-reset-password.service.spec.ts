import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumResetPasswordService } from "./scrum-reset-password.service";

describe("ScrumResetPasswordService", () => {
	let service: ScrumResetPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumResetPasswordService],
		});
		service = TestBed.inject(ScrumResetPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
