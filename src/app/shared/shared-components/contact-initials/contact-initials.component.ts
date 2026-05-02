import { Component, Input } from "@angular/core";

@Component({
	selector: "app-contact-initials",
	templateUrl: "./contact-initials.component.html",
	styleUrls: ["./contact-initials.component.scss"],
	imports: [],
})
export class ContactInitialsComponent {
	@Input() contactName = "";
	@Input() backgroundColor = "#FF7A00";
	@Input() borderColor = "#FFFFFF";
	@Input() size = "21px"; // font-size
	@Input() imgSrc = "";
	@Input() contactEmail = "";
	@Input() contactPhone = "";

	get contactInitials() {
		// Check if contactName is not null or undefined and has a length greater than 0
		if (this.contactName) {
			const contactNames = this.contactName
				.split(" ")
				.filter((cn) => cn !== "");
			const initials = contactNames.map((name) => name[0].toUpperCase());

			// If there's only one word in the contactName, return the first initial.
			// Otherwise, return the first initial and the last initial.
			return initials.length === 1
				? initials[0]
				: `${initials[0]}${initials[initials.length - 1]}`;
		}

		if (this.contactEmail) {
			const initials = this.contactEmail.split("@")[0].toUpperCase();

			return initials.length === 1
				? initials[0]
				: `${initials[0]}${initials[initials.length - 1]}`;
		}

		if (this.contactPhone) {
			return "#";
		}

		return "";
	}
}
