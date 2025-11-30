import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { CardComponent } from "./card.component";

describe("CardComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(CardComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
