import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
	let component: ResetPasswordComponent;
	let fixture: ComponentFixture<ResetPasswordComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ResetPasswordComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { queryParams: of({ token: "test token" }) },
				},
			],
		});
		fixture = TestBed.createComponent(ResetPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
