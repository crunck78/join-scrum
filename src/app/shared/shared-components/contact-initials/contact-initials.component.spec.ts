import { render } from "@testing-library/angular";
import { ContactInitialsComponent } from "./contact-initials.component";

describe("ContactInitialsComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactInitialsComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
