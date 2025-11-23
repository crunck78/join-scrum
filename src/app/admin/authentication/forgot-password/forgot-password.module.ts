import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { CardComponent } from "src/app/shared/shared-components/card/card.component";
import { FormFieldComponent } from "src/app/shared/shared-components/form-field/form-field.component";
import { LogoComponent } from "src/app/shared/shared-components/logo/logo.component";
import { PageTitleComponent } from "src/app/shared/shared-components/page-title/page-title.component";
import { ToLoginComponent } from "src/app/shared/shared-components/to-login/to-login.component";

const imports = [
	MaterialModule,
	CommonModule,
	CardComponent,
	PageTitleComponent,
	ReactiveFormsModule,
	RouterLink,
	FormFieldComponent,
	ToLoginComponent,
	LogoComponent,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class ForgotPasswordModule {}
