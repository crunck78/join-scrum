import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { ContactCardComponent } from "./contact-card.component";

describe("ContactCardComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactCardComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
