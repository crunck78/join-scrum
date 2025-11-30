import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumSignupService } from "./scrum-signup.service";

describe("ScrumSignupService", () => {
	let service: ScrumSignupService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumSignupService],
		});
		service = TestBed.inject(ScrumSignupService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
