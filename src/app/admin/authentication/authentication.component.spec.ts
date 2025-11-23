import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { routes } from "src/app/shared/routes";
import { AuthenticationComponent } from "./authentication.component";

describe("AuthenticationComponent", () => {
	let component: AuthenticationComponent;
	let fixture: ComponentFixture<AuthenticationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [provideRouter(routes)],
		}).compileComponents();

		fixture = TestBed.createComponent(AuthenticationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
