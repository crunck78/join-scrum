import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { UserResponse } from "../../shared/models/user.model";
import {
	clickElement,
	clickMenuItem,
	createUserResponse,
} from "../../testing/fixtures";
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
		const profile = createUserResponse();
		const scenarios = [
			{
				description: "should set profile to null when there is no profile",
				profileFromService: null,
				expected: null,
			},
			{
				description: "should set profile when profile is loaded",
				profileFromService: profile,
				expected: profile,
			},
		];

		it.each(scenarios)("$description", async ({
			profileFromService,
			expected,
		}) => {
			getProfileServiceSpy$.mockReturnValue(of(profileFromService));
			fixture.autoDetectChanges();

			expect(component.profile).toBe(expected);
		});
	});

	describe("editProfile", () => {
		function setupProfile(profile: UserResponse | null) {
			getProfileServiceSpy$.mockReturnValue(of(profile));
			fixture.autoDetectChanges();
		}

		function setupEditDialog(result: UserResponse | null) {
			return vi
				.spyOn(profileService, "openEditProfileDialog")
				.mockReturnValue(of(result));
		}
		it("should not open dialog when profile is null", () => {
			setupProfile(null);
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			component.editProfile();
			expect(openEditSpy).not.toHaveBeenCalled();
		});

		it("should open edit dialog when profile exists", () => {
			const profile = createUserResponse();
			setupProfile(profile);
			const openEditSpy = setupEditDialog(null);
			component.editProfile();
			expect(openEditSpy).toHaveBeenCalledWith(profile);
		});

		it("should refresh profile when dialog returns a result", () => {
			const profile = createUserResponse();
			setupProfile(profile);
			setupEditDialog(profile);
			const refreshSpy = vi.spyOn(component, "refreshProfile");
			component.editProfile();
			expect(refreshSpy).toHaveBeenCalledOnce();
		});

		it("should not refresh profile when dialog returns null", () => {
			const profile = createUserResponse();
			setupProfile(profile);
			setupEditDialog(null);
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
		async function openProfileMenuAndClick(item: string) {
			fixture.autoDetectChanges();
			clickElement(fixture, 'button[aria-label="Profile Menu"]');
			await clickMenuItem(loader, item);
		}

		beforeEach(() => {
			const profile = createUserResponse();
			getProfileServiceSpy$.mockReturnValue(of(profile));
		});

		it("should call editProfile when Edit menu item is clicked", async () => {
			const editProfileSpy = vi.spyOn(component, "editProfile");
			const openEditSpy = vi.spyOn(profileService, "openEditProfileDialog");
			openEditSpy.mockReturnValue(of(null));
			await openProfileMenuAndClick("Edit");

			expect(editProfileSpy).toHaveBeenCalledOnce();
		});

		it("should call deleteProfile when Delete menu item is clicked", async () => {
			const deleteProfileSpy = vi.spyOn(profileService, "deleteProfile");
			deleteProfileSpy.mockImplementation(() => {});
			await openProfileMenuAndClick("Delete");

			expect(deleteProfileSpy).toHaveBeenCalledOnce();
		});
	});

	describe("changeImg", () => {
		const scenarios = [
			{
				description: "should refresh profile when image is changed",
				changed: true,
				expectedCall: 1,
			},
			{
				description: "should not refresh profile when image is not changed",
				changed: false,
				expectedCall: 0,
			},
		];

		it.each(scenarios)("$description", ({ changed, expectedCall }) => {
			getProfileServiceSpy$.mockReturnValue(of(null));
			const openCropperSpy = vi.spyOn(
				profileService,
				"openProfileImageCropperDialog",
			);
			openCropperSpy.mockReturnValue(of(changed));
			fixture.autoDetectChanges();
			const refreshSpy = vi.spyOn(component, "refreshProfile");

			component.changeImg();

			expect(refreshSpy).toHaveBeenCalledTimes(expectedCall);
		});

		it("should call openProfileImageCropperDialog when change image button is clicked", () => {
			const profile = createUserResponse();
			getProfileServiceSpy$.mockReturnValue(of(profile));
			const changeImgSpy = vi.spyOn(component, "changeImg");
			const openCropperSpy = vi.spyOn(
				profileService,
				"openProfileImageCropperDialog",
			);
			openCropperSpy.mockReturnValue(of(false));
			fixture.autoDetectChanges();

			clickElement(fixture, 'button[aria-label="Change profile image"]');

			expect(changeImgSpy).toHaveBeenCalledOnce();
			expect(openCropperSpy).toHaveBeenCalledOnce();
		});
	});
});
