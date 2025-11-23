import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { routes } from "../../routes";
import { RouterLinkComponent } from "./router-link.component";

describe("RouterLinkComponent", () => {
	let component: RouterLinkComponent;
	let fixture: ComponentFixture<RouterLinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [provideRouter(routes)],
		}).compileComponents();

		fixture = TestBed.createComponent(RouterLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
