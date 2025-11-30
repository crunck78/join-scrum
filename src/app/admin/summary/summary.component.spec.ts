import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { SummaryComponent } from "./summary.component";

describe("SummaryComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(SummaryComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
