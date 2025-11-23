import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ScrumResetPasswordService } from "./scrum-reset-password.service";

describe("ScrumResetPasswordService", () => {
	let service: ScrumResetPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule)],
		});
		service = TestBed.inject(ScrumResetPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
