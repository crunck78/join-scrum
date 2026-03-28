import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMenuHarness } from "@angular/material/menu/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { UserResponse } from "../../shared/models/user.model";
import { ProfileComponent } from "./profile.component";
import { ProfileService } from "./profile.service";

describe("ProfileComponent", () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;
	let profileService: ProfileService;
	let getProfileServiceSpy$: Mock<() => Observable<UserResponse | null>>;
	let loader: HarnessLoader;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ProfileComponent],
			providers: [ProfileService],
		});
		profileService = TestBed.inject(ProfileService);
		getProfileServiceSpy$ = vi.spyOn(profileService, "profile$", "get");

		fixture = TestBed.createComponent(ProfileComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
		component = fixture.componentInstance;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create", () => {
		getProfileServiceSpy$.mockReturnValue(of(null));
		fixture.autoDetectChanges();

		expect(component).toBeDefined();
	});

	describe("refreshProfile", () => {
		it("should set profile to null when there is no profile", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			fixture.autoDetectChanges();

			expect(component.profile).toBeNull();
		});

		it("should set profile when profile is loaded", () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfileServiceSpy$.mockReturnValue(of(profile));
			fixture.autoDetectChanges();

			expect(component.profile).toEqual(profile);
		});
	});

	describe("editProfile", () => {
		it("should not open dialog when profile is null", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			fixture.autoDetectChanges();

			component.editProfile();

			expect(openEditSpy).not.toHaveBeenCalled();
		});

		it("should open edit dialog when profile exists", () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfileServiceSpy$.mockReturnValue(of(profile));
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			openEditSpy.mockReturnValue(of(null));
			fixture.autoDetectChanges();

			component.editProfile();

			expect(openEditSpy).toHaveBeenCalledWith(profile);
		});

		it("should refresh profile when dialog is closed with a result", () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfileServiceSpy$.mockReturnValue(of(profile));
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			openEditSpy.mockReturnValue(of(profile));
			fixture.autoDetectChanges();
			const refreshSpy = vi.spyOn(component, "refreshProfile");

			component.editProfile();

			expect(refreshSpy).toHaveBeenCalledOnce();
		});

		it("should not refresh profile when dialog is closed without saving", () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfileServiceSpy$.mockReturnValue(of(profile));
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			openEditSpy.mockReturnValue(of(null));
			fixture.autoDetectChanges();
			const refreshSpy = vi.spyOn(component, "refreshProfile");

			component.editProfile();

			expect(refreshSpy).not.toHaveBeenCalled();
		});
	});

	describe("deleteProfile", () => {
		it("should delegate to profileService", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const deleteProfileSpy = vi.spyOn(profileService, "deleteProfile");
			deleteProfileSpy.mockImplementation(() => {});
			fixture.autoDetectChanges();

			component.deleteProfile();

			expect(deleteProfileSpy).toHaveBeenCalledOnce();
		});
	});

	describe("profile menu", () => {
		it("should call editProfile when Edit menu item is clicked", async () => {
			const profile: UserResponse = {
				id: 1,
				name: "Test User",
				email: "test@test.local",
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
				isGuest: false,
			};
			getProfileServiceSpy$.mockReturnValue(of(profile));
			const editProfileSpy = vi.spyOn(component, "editProfile");
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			openEditSpy.mockReturnValue(of(null));
			fixture.autoDetectChanges();

			fixture.nativeElement
				.querySelector('button[aria-label="Profile Menu"]')
				.click();

			const matMenus = await loader.getAllHarnesses(MatMenuHarness);
			for (const menu of matMenus) {
				if (await menu.isOpen()) {
					const items = await menu.getItems();
					for (const item of items) {
						if ((await item.getText()).includes("Edit")) {
							await item.click();
						}
					}
				}
			}

			expect(editProfileSpy).toHaveBeenCalledOnce();
		});

		it("should call deleteProfile when Delete menu item is clicked", async () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const deleteProfileSpy = vi.spyOn(profileService, "deleteProfile");
			deleteProfileSpy.mockImplementation(() => {});
			fixture.autoDetectChanges();

			fixture.nativeElement
				.querySelector('button[aria-label="Profile Menu"]')
				.click();

			const matMenus = await loader.getAllHarnesses(MatMenuHarness);
			for (const menu of matMenus) {
				if (await menu.isOpen()) {
					const items = await menu.getItems();
					for (const item of items) {
						if ((await item.getText()).includes("Delete")) {
							await item.click();
						}
					}
				}
			}

			expect(deleteProfileSpy).toHaveBeenCalledOnce();
		});
	});

	describe("changeImg", () => {
		it("should call openProfileImageCropperDialog when change image button is clicked", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const changeImgSpy = vi.spyOn(component, "changeImg");
			const openCropperSpy = vi.spyOn(
				profileService,
				"openProfileImageCropperDialog",
			);
			openCropperSpy.mockReturnValue(of(false));
			fixture.autoDetectChanges();

			const changeImgBtn: HTMLButtonElement =
				fixture.nativeElement.querySelector(
					'button[aria-label="Change profile image"]',
				);
			changeImgBtn.click();

			expect(changeImgSpy).toHaveBeenCalledOnce();
			expect(openCropperSpy).toHaveBeenCalledOnce();
		});

		it("should refresh profile when image is changed", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const openCropperSpy = vi.spyOn(
				profileService,
				"openProfileImageCropperDialog",
			);
			openCropperSpy.mockReturnValue(of(true));
			fixture.autoDetectChanges();
			const refreshSpy = vi.spyOn(component, "refreshProfile");

			component.changeImg();

			expect(refreshSpy).toHaveBeenCalledOnce();
		});

		it("should not refresh profile when image is not changed", () => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const openCropperSpy = vi.spyOn(
				profileService,
				"openProfileImageCropperDialog",
			);
			openCropperSpy.mockReturnValue(of(false));
			fixture.autoDetectChanges();
			const refreshSpy = vi.spyOn(component, "refreshProfile");

			component.changeImg();

			expect(refreshSpy).not.toHaveBeenCalled();
		});
	});
});
