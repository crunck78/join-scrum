import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { AnnouncementComponent } from "./announcement.component";

describe("AnnouncementComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AnnouncementComponent, {});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
