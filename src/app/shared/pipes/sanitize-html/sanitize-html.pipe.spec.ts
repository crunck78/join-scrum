import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";

import { ByPassSanitizeHtmlPipe } from "./sanitize-html.pipe";

// TODO: XSS check

describe("SanitizeHtmlPipe", () => {
	let pipe: ByPassSanitizeHtmlPipe;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [DomSanitizer] });
		pipe = TestBed.runInInjectionContext(() => new ByPassSanitizeHtmlPipe());
	});

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});
});
