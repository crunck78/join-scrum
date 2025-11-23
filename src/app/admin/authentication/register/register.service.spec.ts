import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { RegisterService } from "./register.service";

describe("RegisterService", () => {
	let service: RegisterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		});
		service = TestBed.inject(RegisterService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
