import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { AddTaskService } from "./add-task.service";

describe("AddTaskService", () => {
	let service: AddTaskService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AddTaskService],
		});
		service = TestBed.inject(AddTaskService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
