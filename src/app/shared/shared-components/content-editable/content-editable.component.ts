import {
	type AfterViewInit,
	Component,
	type ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from "@angular/core";

import { FormsModule } from "@angular/forms";
import type { Subject } from "rxjs";

type DisplayStyle = "none" | "inline" | "block";

@Component({
	selector: "app-content-editable",
	imports: [FormsModule],
	templateUrl: "./content-editable.component.html",
	styleUrls: ["./content-editable.component.scss"],
})
export class ContentEditableComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		// subscribe to given subject that emits contentId when editing is requested
		this.changing?.subscribe((contentId) => {
			if (contentId === this.contentId)
				this.editValue(this.inputEdit.nativeElement);
		});

		// sets click event on the element containing the current value that requested editing
		if (this.elementViewClick)
			this.elementView.addEventListener("click", () => {
				this.editValue(this.inputEdit.nativeElement);
			});
	}

	@Input() contentId!: number;
	@Input() elementView!: HTMLElement;
	@Input() elementViewDisplay!: DisplayStyle;
	@Input() valueToEdit!: string;
	@Input() changing!: Subject<number>;
	@Input() elementViewClick = false;
	@Input() label!: string;

	@Output() valueToEditChange = new EventEmitter<string>();
	@ViewChild("inputEdit") inputEdit!: ElementRef<HTMLInputElement>;

	editValue(inputEdit: HTMLInputElement) {
		// hide element containing the current value
		this.elementView.style.display = "none";
		// show input field
		inputEdit.style.display = "inline";
		// focus input
		inputEdit.focus();
	}

	updateValue(inputEdit: HTMLInputElement) {
		// finish editing
		// shows element containing the value edited
		this.elementView.style.display = this.elementViewDisplay;
		// hide input
		inputEdit.style.display = "none";
		// emit back the new value
		this.valueToEditChange.emit(this.valueToEdit);
	}
}
