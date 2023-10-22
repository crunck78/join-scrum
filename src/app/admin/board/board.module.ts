import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { TaskComponent } from 'src/app/shared/shared-components/task/task.component';

const imports = [
  CommonModule,
  CardComponent,
  PageTitleComponent,
  TaskComponent,
  MaterialModule
]

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class BoardModule { }
