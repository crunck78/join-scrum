import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { CardComponent } from "../../shared/shared-components/card/card.component";
import { ContentEditableComponent } from "../../shared/shared-components/content-editable/content-editable.component";
import { PageTitleComponent } from "../../shared/shared-components/page-title/page-title.component";
import { TaskComponent } from "../../shared/shared-components/task/task.component";

const imports = [
	CommonModule,
	CardComponent,
	PageTitleComponent,
	TaskComponent,
	MaterialModule,
	ContentEditableComponent,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class BoardModule {}
