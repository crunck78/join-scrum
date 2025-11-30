import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { MainComponent } from "./main.component";

describe("MainComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(MainComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
