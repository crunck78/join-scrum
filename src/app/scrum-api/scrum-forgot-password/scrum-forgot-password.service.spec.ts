import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { ScrumForgotPasswordService } from "./scrum-forgot-password.service";

describe("ScrumForgotPasswordService", () => {
	let service: ScrumForgotPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		});
		service = TestBed.inject(ScrumForgotPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
