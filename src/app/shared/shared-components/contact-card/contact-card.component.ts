import { Component, Input } from "@angular/core";
import type { ContactResponse } from "../../models/contact.model";
import { ContactInitialsComponent } from "../contact-initials/contact-initials.component";
import { EmailLinkComponent } from "../email-link/email-link.component";

@Component({
	selector: "app-contact-card",
	templateUrl: "./contact-card.component.html",
	styleUrls: ["./contact-card.component.scss"],
	imports: [ContactInitialsComponent, EmailLinkComponent],
})
export class ContactCardComponent {
	@Input() contact!: ContactResponse | null;
	@Input() size = "21px";
	@Input() showName = true;
	contentProjected = false;
}
