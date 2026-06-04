import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
	name: "atoz",
	standalone: true,
})
export class AtoZPipe implements PipeTransform {
	transform(element: HTMLElement, letter: string): boolean {
		// TODO: decouple "#contact-"
		return !element.querySelector(`#contact-${letter}`);
	}
}
