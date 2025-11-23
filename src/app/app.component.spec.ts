import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
