import { render } from "@testing-library/angular";
import { ContactComponent } from "./contact.component";

describe("ContactComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
