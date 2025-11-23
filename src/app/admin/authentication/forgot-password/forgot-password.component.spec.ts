import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { routes } from "src/app/shared/routes";
import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(
					BrowserAnimationsModule,
					HttpClientModule,
					MaterialModule,
				),
				provideRouter(routes),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
