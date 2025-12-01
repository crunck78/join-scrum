import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { HeaderService } from "./header.service";

class ScrumApiServiceStub {
	logout = vi.fn();
}

describe("HeaderService", () => {
	let service: HeaderService;
	let scrumApiStub: ScrumApiServiceStub;

	beforeEach(() => {
		scrumApiStub = new ScrumApiServiceStub();
		TestBed.configureTestingModule({
			providers: [
				HeaderService,
				{ provide: ScrumApiService, useValue: scrumApiStub },
			],
		});
		service = TestBed.inject(HeaderService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should delegate logout to ScrumApiService", () => {
		service.logout();
		expect(scrumApiStub.logout).toHaveBeenCalledTimes(1);
	});
});
