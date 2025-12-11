import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
	let component: LogInComponent;
	let fixture: ComponentFixture<LogInComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LogInComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { queryParams: of({ returnUrl: "" }) },
				},
			],
		});
		fixture = TestBed.createComponent(LogInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
