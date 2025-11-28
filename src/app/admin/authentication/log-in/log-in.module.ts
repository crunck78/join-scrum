import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MaterialModule } from "../../../shared/modules/material/material.module";
import { CardComponent } from "../../../shared/shared-components/card/card.component";
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { LogoComponent } from "../../../shared/shared-components/logo/logo.component";
import { PageTitleComponent } from "../../../shared/shared-components/page-title/page-title.component";

const imports = [
	CommonModule,
	MaterialModule,
	CardComponent,
	PageTitleComponent,
	ReactiveFormsModule,
	RouterLink,
	FormFieldComponent,
	LogoComponent,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class LogInModule { }
