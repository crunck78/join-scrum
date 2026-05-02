import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import type { ContactResponse } from "../../models/contact.model";
import { ContactCardComponent } from "../contact-card/contact-card.component";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"],
	imports: [CommonModule, MatButtonModule, ContactCardComponent],
})
export class ContactComponent {
	@Input() contact!: ContactResponse;
	@Input() selected!: boolean;
}
