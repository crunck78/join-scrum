import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { RouterLinkComponent } from "./router-link.component";

describe("RouterLinkComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(RouterLinkComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
