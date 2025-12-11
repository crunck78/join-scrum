import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { ToLoginComponent } from "./to-login.component";

describe("ToLoginComponent", () => {
	let component: ToLoginComponent;
	let fixture: ComponentFixture<ToLoginComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ToLoginComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(ToLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
