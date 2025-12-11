import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ForgotPasswordComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
