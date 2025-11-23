import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
	let component: LogInComponent;
	let fixture: ComponentFixture<LogInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(
					BrowserAnimationsModule,
					HttpClientModule,
					MaterialModule,
				),
				provideRouter(ROUTES),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LogInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
