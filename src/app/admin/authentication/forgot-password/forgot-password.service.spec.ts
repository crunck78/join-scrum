import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ForgotPasswordService } from "./forgot-password.service";

describe("ForgotPasswordService", () => {
	let service: ForgotPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ForgotPasswordService],
		});
		service = TestBed.inject(ForgotPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
