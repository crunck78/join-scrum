import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ResetPasswordService } from "./reset-password.service";

describe("ResetPasswordService", () => {
	let service: ResetPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ResetPasswordService, provideRouter([])],
		});
		service = TestBed.inject(ResetPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
