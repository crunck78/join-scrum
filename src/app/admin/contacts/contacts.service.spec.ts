import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { ContactResponse } from "../../shared/models/contact.model";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { ContactsService } from "./contacts.service";

describe("ContactsService", () => {
	let service: ContactsService;
	const dialogOpen = vi.fn();
	const matchesWebBreakpoint$ = new Subject<boolean>();
	const getContacts$ = vi.fn();
	const deleteContact$ = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$ },
				},
				{
					provide: ScrumContactsService,
					useValue: { getContacts$, deleteContact$ },
				},
				{
					provide: MatDialog,
					useValue: { open: dialogOpen },
				},
			],
		});
		service = TestBed.inject(ContactsService);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("contacts$", () => {
		it("should return empty list when there are no contacts", async () => {
			getContacts$.mockReturnValue(of([]));
			const result = await firstValueFrom(service.contacts$);

			expect(result.length).toEqual(0);
		});

		it("should return contacts when there are any", async () => {
			const contact: ContactResponse = {
				id: 1,
				createdAt: new Date(),
				email: "contact@test.local",
				name: "Test Contact",
				phoneNumber: "01222222222",
				updatedAt: new Date(),
			};
			getContacts$.mockReturnValue(of([contact]));

			const result = await firstValueFrom(service.contacts$);

			expect(result).toEqual([contact]);
		});
	});

	describe("matchWebBreakpoint$", () => {
		it("should return the breakpoints observable", () => {
			expect(service.matchWebBreakpoint$).toBe(matchesWebBreakpoint$);
		});
	});

	describe("deleteContact$", () => {
		it("should delegate to scrumContacts and return false", async () => {
			deleteContact$.mockReturnValue(of(false));
			const result = await firstValueFrom(service.deleteContact$(1));
			expect(deleteContact$).toHaveBeenCalledWith(1);
			expect(result).toBeFalsy();
		});

		it("should delegate to scrumContacts and return true", async () => {
			deleteContact$.mockReturnValue(of(true));
			const result = await firstValueFrom(service.deleteContact$(1));
			expect(deleteContact$).toHaveBeenCalledWith(1);
			expect(result).toBeTruthy();
		});
	});
});
