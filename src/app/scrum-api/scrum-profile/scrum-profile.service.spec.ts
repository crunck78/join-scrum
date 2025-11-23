import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ScrumProfileService } from "./scrum-profile.service";

describe("ScrumProfileService", () => {
	let service: ScrumProfileService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule)],
		});
		service = TestBed.inject(ScrumProfileService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
