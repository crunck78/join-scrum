import { MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { AddCategoryComponent } from "./add-category.component";

describe("AddCategoryComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddCategoryComponent, {
			providers: [{ provide: MatDialogRef, useValue: {} }],
		});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
