import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { SideComponent } from "./side.component";

describe("SideComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(SideComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
