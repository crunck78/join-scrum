import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileImageCropperComponent } from "./image-cropper.component";

describe("ProfileImageCropperComponent", () => {
	let component: ProfileImageCropperComponent;
	let fixture: ComponentFixture<ProfileImageCropperComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [ProfileImageCropperComponent] });
		fixture = TestBed.createComponent(ProfileImageCropperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
