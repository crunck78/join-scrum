import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { EditContactComponent } from "./edit-contact.component";

describe("EditContactComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(EditContactComponent, { providers: [{ provide: MatDialogRef, useValue: {} }], });

		expect(fixture.componentInstance).toBeTruthy();
	});
});
