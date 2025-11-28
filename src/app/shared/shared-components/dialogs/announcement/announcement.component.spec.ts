import { render } from "@testing-library/angular";
import { AnnouncementComponent } from "./announcement.component";

describe("AnnouncementComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AnnouncementComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
