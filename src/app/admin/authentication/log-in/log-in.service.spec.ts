import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { LogInService } from "./log-in.service";

describe("LogInService", () => {
	let service: LogInService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		});
		service = TestBed.inject(LogInService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
