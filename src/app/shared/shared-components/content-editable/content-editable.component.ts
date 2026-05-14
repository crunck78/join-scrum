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
		this.changing?.subscribe(() => {
			this.editValue();
		});

		if (this.elementViewClick)
			this.elementView.addEventListener("click", () => {
				this.editValue();
			});
	}

	@Input() elementView!: HTMLElement;
	@Input() elementViewDisplay!: DisplayStyle;
	@Input() valueToEdit!: string;
	@Input() changing!: Subject<void>;
	@Input() elementViewClick = false;
	@Input() label!: string;

	@Output() valueToEditChange = new EventEmitter<string>();
	@ViewChild("inputEdit") inputEdit!: ElementRef<HTMLInputElement>;

	editValue() {
		this.elementView.style.display = "none";
		this.inputEdit.nativeElement.style.display = "inline";
		this.inputEdit.nativeElement.focus();
	}

	updateValue(event?: Event) {
		event?.preventDefault();
		event?.stopPropagation();
		this.elementView.style.display = this.elementViewDisplay;
		this.inputEdit.nativeElement.style.display = "none";
		this.valueToEditChange.emit(this.valueToEdit);
	}
}
