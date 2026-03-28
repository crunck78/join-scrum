import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, of } from "rxjs";
import { ScrumApiService } from "../../scrum-api/scrum-api.service";
import { ScrumProfileService } from "../../scrum-api/scrum-profile/scrum-profile.service";
import { UserResponse } from "../../shared/models/user.model";
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
		it("should return null when there is no profile", async () => {
			getProfile$.mockReturnValue(of(null));
			const result = await firstValueFrom(service.profile$);
			expect(result).toBeNull();
		});

		it("should return the user profile", async () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfile$.mockReturnValue(of(profile));

			const result = await firstValueFrom(service.profile$);

			expect(result).toEqual(profile);
		});
	});

	describe("openEditProfileDialog", () => {
		it("should return null when dialog is closed without saving", async () => {
			dialogOpen.mockReturnValue({
				componentInstance: {
					profileToEdit: 0,
					editProfileForm: { patchValue: vi.fn() },
				},
				afterClosed: () => of(null),
			});
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};

			const result = await firstValueFrom(service.openEditProfileDialog(profile));

			expect(result).toBeNull();
		});

		it("should return the edited profile when dialog is saved", async () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			dialogOpen.mockReturnValue({
				componentInstance: {
					profileToEdit: 0,
					editProfileForm: { patchValue: vi.fn() },
				},
				afterClosed: () => of(profile),
			});

			const result = await firstValueFrom(service.openEditProfileDialog(profile));

			expect(result).toEqual(profile);
		});

		it("should set profileToEdit id and patch form on dialog componentInstance", async () => {
			const profile: UserResponse = {
				id: 42,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			const patchValue = vi.fn();
			const componentInstance = { profileToEdit: 0, editProfileForm: { patchValue } };
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
		it("should call logout when profile is successfully deleted", () => {
			deleteProfile$.mockReturnValue(of(true));

			service.deleteProfile();

			expect(logout).toHaveBeenCalledOnce();
		});

		it("should not call logout when profile deletion fails", () => {
			deleteProfile$.mockReturnValue(of(false));

			service.deleteProfile();

			expect(logout).not.toHaveBeenCalled();
		});
	});

	describe("openProfileImageCropperDialog", () => {
		it("should return false when dialog is closed without change", async () => {
			dialogOpen.mockReturnValue({ afterClosed: () => of(false) });

			const result = await firstValueFrom(service.openProfileImageCropperDialog());

			expect(result).toBeFalsy();
		});

		it("should return true when image is changed", async () => {
			dialogOpen.mockReturnValue({ afterClosed: () => of(true) });

			const result = await firstValueFrom(service.openProfileImageCropperDialog());

			expect(result).toBeTruthy();
		});
	});
});
