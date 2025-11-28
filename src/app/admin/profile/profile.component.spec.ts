import { render } from "@testing-library/angular";
import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ProfileComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
