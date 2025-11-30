import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { PageTitleComponent } from "./page-title.component";

describe("PageTitleComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(PageTitleComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
