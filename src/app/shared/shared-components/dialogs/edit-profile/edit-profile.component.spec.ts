import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { EditProfileComponent } from "./edit-profile.component";

describe("EditProfileComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(EditProfileComponent, { providers: [{ provide: MatDialogRef, useValue: {} }], });

		expect(fixture.componentInstance).toBeTruthy();
	});
});
