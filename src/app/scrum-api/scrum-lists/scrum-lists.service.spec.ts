import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ScrumListsService } from "./scrum-lists.service";

describe("ScrumListsService", () => {
	let service: ScrumListsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScrumListsService],
		});
		service = TestBed.inject(ScrumListsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
