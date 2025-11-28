import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { type Observable, take } from "rxjs";
import { ScrumBoardsService } from "../../../../scrum-api/scrum-boards/scrum-boards.service";
import { ScrumListsService } from "../../../../scrum-api/scrum-lists/scrum-lists.service";
import { BoardResponse } from "../../../models/board.model";
import { ListRequest } from "../../../models/list.model";
import { MaterialModule } from "../../../modules/material/material.module";
import { OptionsPipe } from "../../../pipes/options/options.pipe";
import { DialogComponent } from "../../dialog/dialog.component";
import {
	FormFieldComponent,
	type OptionType,
} from "../../form-field/form-field.component";

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
export class AddListComponent {
	dialogRef = inject<MatDialogRef<AddListComponent>>(MatDialogRef);
	private scrumList = inject(ScrumListsService);
	private scrumBoard = inject(ScrumBoardsService);

	boards$: Observable<BoardResponse[]>;

	addListForm = new FormGroup({
		name: new FormControl("", Validators.compose([Validators.required])),
		board: new FormControl(null, Validators.compose([Validators.required])),
	});

	constructor() {
		this.boards$ = this.scrumBoard.getBoards$();
	}

	addList() {
		if (this.addListForm.valid) {
			this.scrumList
				.addList$(this.addListForm.value as Partial<ListRequest>)
				.pipe(take(1))
				.subscribe((res) => {
					if (res) this.dialogRef.close(res);
				});
		}
	}

	getBoardOptionHTML(option: OptionType) {
		return `
    <span class="priority-option">
      <span class="priority-option">${option["id"]} ${(option["title"] as string)?.toUpperCase()}</span>
    </span>
    `;
	}
}
