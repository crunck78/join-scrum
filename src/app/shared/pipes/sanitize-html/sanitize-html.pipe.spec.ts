import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { SanitizeHtmlPipe } from "./sanitize-html.pipe";

// TODO: XSS check

describe("SanitizeHtmlPipe", () => {
	let pipe: SanitizeHtmlPipe;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [DomSanitizer] });
		pipe = TestBed.runInInjectionContext(() => new SanitizeHtmlPipe());
	});

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
