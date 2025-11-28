import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { render } from "@testing-library/angular";
import { AddTaskDialogComponent } from "./add-task-dialog.component";

describe("AddTaskDialogComponent", () => {
	it("should create", async () => {
		const { fixture } = await render(AddTaskDialogComponent, {
			providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }],
		});

		expect(fixture.componentInstance).toBeTruthy();
	});
});
