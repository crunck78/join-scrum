import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { OptionsPipe } from 'src/app/shared/pipes/options/options.pipe';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { FormFieldComponent } from 'src/app/shared/shared-components/form-field/form-field.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';

export interface Priority {
  name: string,
  icon: string,
  color: string
}

export declare type PriorityType = 'Low' | 'Medium' | 'Urgent';
export declare type TaskMode = 'add' | 'edit';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  OptionsPipe,
  FormFieldComponent,
  CardComponent,
  PageTitleComponent,
  MaterialModule,
];

@NgModule({
  declarations: [],
  imports: [imports],
  exports: [imports]
})
export class AddTaskModule { }
