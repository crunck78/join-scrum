import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of, Subject } from "rxjs";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";
import { createContactResponse } from "../../testing/fixtures";
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
		const contact = createContactResponse();
		const scenarios = [
			{
				description: "should return empty list when there are no contacts",
				contacts: [],
				expected: [],
			},
			{
				description: "should return contacts when there are any",
				contacts: [contact],
				expected: [contact],
			},
		];

		it.each(scenarios)("$description", async ({ contacts, expected }) => {
			getContacts$.mockReturnValue(of(contacts));
			const result = await firstValueFrom(service.contacts$);

			expect(result).toEqual(expected);
		});
	});

	describe("matchWebBreakpoint$", () => {
		it("should return the breakpoints observable", () => {
			expect(service.matchWebBreakpoint$).toBe(matchesWebBreakpoint$);
		});
	});

	describe("deleteContact$", () => {
		const scenarios = [
			{
				description: "should delegate to scrumContacts and return false",
				deleteContactsResult: false,
				expected: false,
			},
			{
				description: "should delegate to scrumContacts and return true",
				deleteContactsResult: true,
				expected: true,
			},
		];

		it.each(scenarios)("$description", async ({
			deleteContactsResult,
			expected,
		}) => {
			deleteContact$.mockReturnValue(of(deleteContactsResult));
			const result = await firstValueFrom(service.deleteContact$(1));
			expect(deleteContact$).toHaveBeenCalledWith(1);
			expect(result).toBe(expected);
		});
	});

	describe("openAddDialogContact", () => {
		const contact = createContactResponse();
		const scenarios = [
			{
				description: "should return no contact after dialog closed",
				afterClosedValue: null,
				expected: null,
			},
			{
				description: "should return new contact after dialog closed",
				afterClosedValue: contact,
				expected: contact,
			},
		];

		it.each(scenarios)("$description", async ({
			afterClosedValue,
			expected,
		}) => {
			dialogOpen.mockReturnValue({ afterClosed: () => of(afterClosedValue) });

			const result = await firstValueFrom(service.openAddContactDialog());
			expect(result).toBe(expected);
		});
	});
});
