import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { NavigationComponent } from "./navigation.component";

describe("Navigation", () => {
	it("should create", async () => {
		const { fixture } = await render(NavigationComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
