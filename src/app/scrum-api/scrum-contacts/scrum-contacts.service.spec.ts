import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import { Contact } from "../../shared/models/contact.model";
import {
	createContactRequestAPI,
	createContactResponseAPI,
} from "../../testing/fixtures";
import {
	CONTACTS_ENDPOINT,
	ScrumContactsService,
} from "./scrum-contacts.service";

const mockAssignee = createContactResponseAPI();
const mockAssigneeRequest = createContactRequestAPI();

describe("ScrumContactsService", () => {
	let service: ScrumContactsService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumContactsService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getContacts$", () => {
		it("should return mapped contacts on success", async () => {
			const resultPromise = firstValueFrom(service.getContacts$());
			const req = httpTesting.expectOne(
				CONTACTS_ENDPOINT,
				"Request to load contacts",
			);
			expect(req.request.method).toBe("GET");

			req.flush([mockAssignee]);

			expect(await resultPromise).toEqual([
				Contact.createInternalValue(mockAssignee),
			]);
		});

		it("should return empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getContacts$());
			const req = httpTesting.expectOne(
				CONTACTS_ENDPOINT,
				"Request to load contacts",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("addContact$", () => {
		it("should return mapped contact on success", async () => {
			const resultPromise = firstValueFrom(
				service.addContact$(mockAssigneeRequest),
			);
			const req = httpTesting.expectOne(
				CONTACTS_ENDPOINT,
				"Request to add contact",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Contact.createRepresentation(mockAssigneeRequest),
			);

			req.flush(mockAssignee);

			expect(await resultPromise).toEqual(
				Contact.createInternalValue(mockAssignee),
			);
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(
				service.addContact$(mockAssigneeRequest),
			);
			const req = httpTesting.expectOne(
				CONTACTS_ENDPOINT,
				"Request to add contact",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("updateContact$", () => {
		it("should return mapped contact on success", async () => {
			const resultPromise = firstValueFrom(
				service.updateContact$(mockAssigneeRequest, 1),
			);
			const req = httpTesting.expectOne(
				`${CONTACTS_ENDPOINT + 1}/`,
				"Request to edit contact",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(
				Contact.createRepresentation(mockAssigneeRequest),
			);

			req.flush(mockAssignee);

			expect(await resultPromise).toEqual(
				Contact.createInternalValue(mockAssignee),
			);
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(
				service.updateContact$(mockAssigneeRequest, 1),
			);
			const req = httpTesting.expectOne(
				`${CONTACTS_ENDPOINT + 1}/`,
				"Request to edit contact",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});

	describe("deleteContact$", () => {
		it("should return true when delete contact success", async () => {
			const resultPromise = firstValueFrom(service.deleteContact$(1));
			const req = httpTesting.expectOne(
				`${CONTACTS_ENDPOINT + 1}/`,
				"Request to delete contact",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush(true);

			expect(await resultPromise).toEqual(true);
		});

		it("should return false when delete contact fails", async () => {
			const resultPromise = firstValueFrom(service.deleteContact$(1));
			const req = httpTesting.expectOne(
				`${CONTACTS_ENDPOINT + 1}/`,
				"Request to delete contact",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual(false);
		});
	});
});
