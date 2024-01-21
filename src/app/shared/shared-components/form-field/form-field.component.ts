import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ErrorStateMatcher } from '@angular/material/core';
import { HasErrorPipe } from './has-error.pipe';
import { MessageErrorPipe } from './message-error.pipe';
import { MaterialModule } from '../../modules/material/material.module';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html/sanitize-html.pipe';
import { CardComponent } from '../card/card.component';
import { PageTitleComponent } from '../page-title/page-title.component';



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

export declare type InputType = 'input' | 'text-area' | 'select' | 'date' | 'color';
export declare type FieldType = 'text' | 'email' | 'password' | 'tel' | 'color';
// eslint-disable-next-line
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent, PageTitleComponent,
    ReactiveFormsModule,
    RouterLink,
    MaterialModule,
    FormFieldComponent,
    HasErrorPipe,
    MessageErrorPipe,
    SanitizeHtmlPipe,
    NgxMatColorPickerModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class FormFieldComponent {

  @Input() control!: FormControl | AbstractControl;
  @Input() labelName!: string;
  @Input() suffixPath!: string;
  @Input() inputType!: InputType;
  @Input() type!: FieldType;
  @Input() autocomplete!: string;
  @Input() errors!: ValidatorError[];
  @Input() minLength!: number;
  @Input() required = true;
  @Input() options!: Option[] | null | undefined;
  @Input() actionName!: string;
  @Input() suffixIcon!: string;
  @Input() multiple = false;
  @Output() action = new EventEmitter<void>();
  today = new Date();

  customMatcher = new CustomErrorStateMatcher();

  resetErrorState() {
    if (this.control?.touched)
      this.control?.markAsUntouched();
  }

  handleInputPhoneNumber(event: InputEvent) {
    const regexDisallowedChars = /[^0-9+]|(?!^)\+/;
    const inputField = event.target as HTMLInputElement;
    const inputFieldValue = inputField.value;

    // Removed disallowed characters
    const sanitizedValue = inputFieldValue.replace(regexDisallowedChars, '');

    // Update the FormControl value with the sanitized value
    this.control.setValue(sanitizedValue);

    // Stop the default input event
    event.preventDefault();
  }

}
