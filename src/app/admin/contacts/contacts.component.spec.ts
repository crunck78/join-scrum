import { render } from "@testing-library/angular";
import { ContactsComponent } from "./contacts.component";

describe("ContactsComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactsComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
