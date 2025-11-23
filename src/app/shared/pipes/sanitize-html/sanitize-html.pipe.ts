import { inject, Pipe, type PipeTransform } from "@angular/core";
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser";

@Pipe({
	name: "sanitizeHtml",
	standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
	private _sanitizer = inject(DomSanitizer);

	transform(v: string): SafeHtml {
		return this._sanitizer.bypassSecurityTrustHtml(v);
	}
}
