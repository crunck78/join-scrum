import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { ToLoginComponent } from "./to-login.component";

describe("ToLoginComponent", () => {
	let component: ToLoginComponent;
	let fixture: ComponentFixture<ToLoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(BrowserAnimationsModule),
				provideRouter(ROUTES),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ToLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
