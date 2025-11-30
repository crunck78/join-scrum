import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumCategoriesService } from "./scrum-categories.service";

describe("ScrumCategoriesService", () => {
	let service: ScrumCategoriesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumCategoriesService],
		});
		service = TestBed.inject(ScrumCategoriesService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
