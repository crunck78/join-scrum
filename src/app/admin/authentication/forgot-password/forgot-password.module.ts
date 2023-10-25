import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { ToLoginComponent } from 'src/app/shared/shared-components/to-login/to-login.component';

const imports = [
  MaterialModule,
  CommonModule,
  CardComponent,
  PageTitleComponent,
  ReactiveFormsModule,
  RouterLink,
  FormFieldComponent,
  ToLoginComponent
];

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class ForgotPasswordModule { }
