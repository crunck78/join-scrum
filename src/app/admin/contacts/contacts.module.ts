import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material/material.module";
import { CardComponent } from "../../shared/shared-components/card/card.component";
import { ContactComponent } from "../../shared/shared-components/contact/contact.component";
import { ContactDetailsComponent } from "../../shared/shared-components/contact-details/contact-details.component";
import { PageTitleComponent } from "../../shared/shared-components/page-title/page-title.component";
import { AtoZPipe } from "./atoz.pipe";

const imports = [
	CommonModule,
	CardComponent,
	PageTitleComponent,
	ContactComponent,
	AtoZPipe,
	ContactDetailsComponent,
	MaterialModule,
];

@NgModule({
	declarations: [],
	imports: [...imports],
	exports: [...imports],
})
export class ContactsModule {}
