import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-editable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-editable.component.html',
  styleUrls: ['./content-editable.component.scss']
})
export class ContentEditableComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.changing?.subscribe(value => {
      if (value) this.editValue(this.inputEdit.nativeElement);
    });

    if (this.elementViewClick)
      this.elementView
        .addEventListener('click', () => {
          this.editValue(this.inputEdit.nativeElement);
        });
  }

  @Input() elementView!: HTMLElement;
  @Input() elementViewDisplay!: string;
  @Input() valueToEdit!: string;
  @Input() changing!: Subject<boolean>;
  @Input() elementViewClick!: boolean;

  @Output() valueToEditChange = new EventEmitter<string>();
  @ViewChild('inputEdit') inputEdit!: ElementRef<HTMLInputElement>;

  editValue(inputEdit: HTMLInputElement) {
    this.elementView.style.display = "none";
    inputEdit.style.display = "inline";
    inputEdit.focus();
  }

  updateValue(inputEdit: HTMLInputElement) {
    this.elementView.style.display = this.elementViewDisplay;
    inputEdit.style.display = "none";
    this.valueToEditChange.emit(this.valueToEdit);
  }

}
