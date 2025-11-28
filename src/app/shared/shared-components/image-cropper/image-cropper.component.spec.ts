import { render } from "@testing-library/angular";
import { ProfileImageCropperComponent } from "./image-cropper.component";

describe("ProfileImageCropperComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ProfileImageCropperComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
