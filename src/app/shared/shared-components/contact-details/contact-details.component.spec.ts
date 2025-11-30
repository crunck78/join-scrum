import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { ContactDetailsComponent } from "./contact-details.component";

describe("ContactDetailsComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactDetailsComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
