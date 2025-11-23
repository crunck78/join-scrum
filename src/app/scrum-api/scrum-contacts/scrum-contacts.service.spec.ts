import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ScrumContactsService } from "./scrum-contacts.service";

describe("ScrumContactsService", () => {
	let service: ScrumContactsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule)],
		});
		service = TestBed.inject(ScrumContactsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
