import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { EditProfileComponent } from "./edit-profile.component";

describe("EditProfileComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(EditProfileComponent, {
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
