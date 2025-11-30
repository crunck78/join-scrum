import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MaterialModule } from "../../../shared/modules/material/material.module";
import { CardComponent } from "../../../shared/shared-components/card/card.component";
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { PageTitleComponent } from "../../../shared/shared-components/page-title/page-title.component";
import { ToLoginComponent } from "../../../shared/shared-components/to-login/to-login.component";

const imports = [
	CommonModule,
	CardComponent,
	PageTitleComponent,
	ReactiveFormsModule,
	RouterLink,
	FormFieldComponent,
	MaterialModule,
	ToLoginComponent,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class ResetPasswordModule {}
