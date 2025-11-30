import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { AddContactComponent } from "./add-contact.component";

describe("AddContactComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddContactComponent, {
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
