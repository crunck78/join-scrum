import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { HasErrorPipe } from './has-error.pipe';
import { MessageErrorPipe } from './message-error.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html/sanitize-html.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && control.touched);
  }
}

export interface ValidatorError {
  name: string,
  message?: string,
  htmlMessage?: string
}

export interface Option {
  valueOnSelect: any,
  displayValue: any,
  value: any,
  html?: string
}

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent, PageTitleComponent,
    MatInputModule, MatFormFieldModule, MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatExpansionModule,
    FormFieldComponent,
    HasErrorPipe,
    MessageErrorPipe,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    SanitizeHtmlPipe,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class FormFieldComponent {

  @Input() control!: FormControl | AbstractControl;
  @Input() labelName!: string;
  @Input() suffixPath!: string;
  @Input() inputType!: 'input' | 'text-area' | 'select' | 'date';
  @Input() type!: 'text' | 'email' | 'password' | 'tel';
  @Input() autocomplete!: string;
  @Input() errors!: ValidatorError[];
  @Input() minLength!: number;
  @Input() required = true;
  @Input() options!: Option[] | null | undefined;
  @Input() actionName!: string;
  @Input() suffixIcon!: string;
  @Input() multiple: boolean = false;
  @Output() action = new EventEmitter<void>();

  customMatcher = new CustomErrorStateMatcher();

  resetErrorState() {
    if (this.control?.touched)
      this.control?.markAsUntouched();
  }

}
