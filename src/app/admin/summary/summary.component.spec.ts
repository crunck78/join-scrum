import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { SummaryComponent } from "./summary.component";

describe("SummaryComponent", () => {
	let component: SummaryComponent;
	let fixture: ComponentFixture<SummaryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SummaryComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(SummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
