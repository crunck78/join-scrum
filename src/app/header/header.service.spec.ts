import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { HeaderService } from "./header.service";

describe("HeaderService", () => {
	let service: HeaderService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [HeaderService] });
		service = TestBed.inject(HeaderService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
