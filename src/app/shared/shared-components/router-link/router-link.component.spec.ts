import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterLinkComponent } from "./router-link.component";

describe("RouterLinkComponent", () => {
	let component: RouterLinkComponent;
	let fixture: ComponentFixture<RouterLinkComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterLinkComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(RouterLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});
});
