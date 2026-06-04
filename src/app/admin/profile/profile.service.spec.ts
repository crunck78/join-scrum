import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of } from "rxjs";
import { ScrumApiService } from "../../scrum-api/scrum-api.service";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { createUserResponse } from "../../testing/fixtures";
import { ProfileService } from "./profile.service";

describe("ProfileService", () => {
	let service: ProfileService;
	const dialogOpen = vi.fn();
	const getProfile$ = vi.fn();
	const deleteProfile$ = vi.fn();
	const logout = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumProfileService,
					useValue: { getProfile$, deleteProfile$ },
				},
				{
					provide: MatDialog,
					useValue: { open: dialogOpen },
				},
				{
					provide: ScrumApiService,
					useValue: { logout },
				},
			],
		});
		service = TestBed.inject(ProfileService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("profile$", () => {
		const profile = createUserResponse();

		it.each([
			{
				description: "should return null when there is no profile",
				serviceResult: null,
				expected: null,
			},
			{
				description: "should return the user profile",
				serviceResult: profile,
				expected: profile,
			},
		])("$description", async ({ serviceResult, expected }) => {
			getProfile$.mockReturnValue(of(serviceResult));

			const result = await firstValueFrom(service.profile$);

			expect(result).toEqual(expected);
		});
	});

	describe("openEditProfileDialog", () => {
		const profile = createUserResponse();

		it.each([
			{
				description: "should return null when dialog is closed without saving",
				dialogResult: null,
				expected: null,
			},
			{
				description: "should return the edited profile when dialog is saved",
				dialogResult: profile,
				expected: profile,
			},
		])("$description", async ({ dialogResult, expected }) => {
			dialogOpen.mockReturnValue({
				componentInstance: {
					profileToEdit: 0,
					editProfileForm: { patchValue: vi.fn() },
				},
				afterClosed: () => of(dialogResult),
			});

			const result = await firstValueFrom(
				service.openEditProfileDialog(profile),
			);

			expect(result).toEqual(expected);
		});

		it("should set profileToEdit id and patch form on dialog componentInstance", async () => {
			const profile = createUserResponse({ id: 42 });
			const patchValue = vi.fn();
			const componentInstance = {
				profileToEdit: 0,
				editProfileForm: { patchValue },
			};
			dialogOpen.mockReturnValue({
				componentInstance,
				afterClosed: () => of(null),
			});
			await firstValueFrom(service.openEditProfileDialog(profile));
			expect(componentInstance.profileToEdit).toBe(42);
			expect(patchValue).toHaveBeenCalledWith(profile);
		});
	});

	describe("deleteProfile", () => {
		it.each([
			{
				description: "should call logout when profile is successfully deleted",
				deleteResult: true,
				shouldLogout: true,
			},
			{
				description: "should not call logout when profile deletion fails",
				deleteResult: false,
				shouldLogout: false,
			},
		])("$description", ({ deleteResult, shouldLogout }) => {
			deleteProfile$.mockReturnValue(of(deleteResult));

			service.deleteProfile();

			if (shouldLogout) {
				expect(logout).toHaveBeenCalledOnce();
			} else {
				expect(logout).not.toHaveBeenCalled();
			}
		});
	});

	describe("openProfileImageCropperDialog", () => {
		it.each([
			{
				description: "should return false when dialog is closed without change",
				dialogResult: false,
			},
			{
				description: "should return true when image is changed",
				dialogResult: true,
			},
		])("$description", async ({ dialogResult }) => {
			dialogOpen.mockReturnValue({
				afterClosed: () => of(dialogResult),
			});

			const result = await firstValueFrom(
				service.openProfileImageCropperDialog(),
			);

			expect(result).toBe(dialogResult);
		});
	});
});
