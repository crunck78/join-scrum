import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';


const imports = [
  CommonModule,
  MaterialModule,
  CardComponent,
  PageTitleComponent,
  ReactiveFormsModule,
  RouterLink,
  FormFieldComponent,
];

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class LogInModule { }
