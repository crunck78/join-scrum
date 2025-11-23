import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { CardComponent } from "src/app/shared/shared-components/card/card.component";
import { ContactComponent } from "src/app/shared/shared-components/contact/contact.component";
import { ContactDetailsComponent } from "src/app/shared/shared-components/contact-details/contact-details.component";
import { PageTitleComponent } from "src/app/shared/shared-components/page-title/page-title.component";
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
