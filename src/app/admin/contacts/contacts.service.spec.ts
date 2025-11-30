import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { ContactsService } from "./contacts.service";

describe("ContactsService", () => {
	let service: ContactsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ContactsService],
		});
		service = TestBed.inject(ContactsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
