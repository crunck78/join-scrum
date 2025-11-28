import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { AddListComponent } from "./add-list.component";

describe("AddListComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddListComponent, { providers: [{ provide: MatDialogRef, useValue: {} }], });

		expect(fixture.componentInstance).toBeTruthy();
	});
});
