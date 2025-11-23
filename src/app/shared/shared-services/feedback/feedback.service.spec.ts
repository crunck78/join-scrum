import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../modules/material/material.module";
import { FeedbackService } from "./feedback.service";

describe("FeedbackService", () => {
	let service: FeedbackService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(MaterialModule)],
		});
		service = TestBed.inject(FeedbackService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
