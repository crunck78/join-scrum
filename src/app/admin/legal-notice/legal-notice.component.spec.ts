import { render } from "@testing-library/angular";
import { LegalNoticeComponent } from "./legal-notice.component";

describe("LegalNoticeComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(LegalNoticeComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
