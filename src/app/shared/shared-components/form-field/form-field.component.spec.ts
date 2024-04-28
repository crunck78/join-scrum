import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldType, FormFieldComponent, InputType } from './form-field.component';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  let formControl = new FormControl('Test');
  let inputType : InputType = 'input';
  let type : FieldType = 'text';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        importProvidersFrom( BrowserAnimationsModule, MaterialModule)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.control = formControl;
    component.inputType = inputType;
    component.type = type;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
