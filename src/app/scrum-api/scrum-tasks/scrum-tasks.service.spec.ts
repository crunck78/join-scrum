import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ScrumTasksService } from "./scrum-tasks.service";

describe("ScrumTasksService", () => {
	let service: ScrumTasksService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule)],
		});
		service = TestBed.inject(ScrumTasksService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
