import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material/material.module';
import { PageTitleComponent } from '../shared/shared-components/page-title/page-title.component';

const imports = [
  CommonModule,
  MaterialModule,
  PageTitleComponent
]

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class HeaderModule { }
