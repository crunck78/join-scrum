import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { CardComponent } from "../../shared/shared-components/card/card.component";
import { ContactInitialsComponent } from "../../shared/shared-components/contact-initials/contact-initials.component";

const imports = [
	CommonModule,
	CardComponent,
	MaterialModule,
	ContactInitialsComponent,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class ProfileModule {}
