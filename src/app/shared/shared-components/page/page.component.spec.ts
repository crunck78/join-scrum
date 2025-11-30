import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { PageComponent } from "./page.component";

describe("PageComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(PageComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
