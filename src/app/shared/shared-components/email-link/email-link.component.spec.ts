import { render } from "@testing-library/angular";
import { EmailLinkComponent } from "./email-link.component";

describe("EmailLinkComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(EmailLinkComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
