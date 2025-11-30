import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LegalNoticeComponent } from "./legal-notice.component";

describe("LegalNoticeComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(LegalNoticeComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
