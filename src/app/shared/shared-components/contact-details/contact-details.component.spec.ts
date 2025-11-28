import { render } from "@testing-library/angular";
import { ContactDetailsComponent } from "./contact-details.component";

describe("ContactDetailsComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactDetailsComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
