import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BoardResponse } from "../../../models/board.model";
import { ListRequest, ListResponse } from "../../../models/list.model";
import { MaterialModule } from "../../../modules/material/material.module";
import { OptionsPipe } from "../../../pipes/options/options.pipe";
import { DialogComponent } from "../../dialog/dialog.component";
import { FormFieldComponent } from "../../form-field/form-field.component";
import { AddListService } from "./add-list.service";

@Component({
	selector: "app-add-list",
	templateUrl: "./add-list.component.html",
	styleUrls: ["./add-list.component.scss"],
	imports: [
		CommonModule,
		DialogComponent,
		MaterialModule,
		FormFieldComponent,
		ReactiveFormsModule,
		OptionsPipe,
	],
})
export class AddListComponent implements OnInit {
	dialogRef =
		inject<MatDialogRef<AddListComponent, ListResponse>>(MatDialogRef);

	private addListService = inject(AddListService);

	boards: BoardResponse[] = [];

	addListForm = new FormGroup({
		name: new FormControl("", Validators.compose([Validators.required])),
		board: new FormControl(null, Validators.compose([Validators.required])),
	});

	ngOnInit() {
		this.addListService.boards$.subscribe((values) => (this.boards = values));
	}

	addList() {
		if (this.addListForm.valid) {
			this.addListService
				.addList(this.addListForm.value as Partial<ListRequest>)
				.subscribe((res) => {
					if (res) this.dialogRef.close(res);
				});
		}
	}

	getBoardOptionHTML = (option: BoardResponse) => {
		return `
    <span class="priority-option">
      <span class="priority-option">${option["id"]} ${(option["title"] as string)?.toUpperCase()}</span>
    </span>
    `;
	};
}
