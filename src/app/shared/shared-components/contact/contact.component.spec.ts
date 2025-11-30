import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { ContactComponent } from "./contact.component";

describe("ContactComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(ContactComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
