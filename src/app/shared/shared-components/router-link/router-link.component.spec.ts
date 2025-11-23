import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { RouterLinkComponent } from "./router-link.component";

describe("RouterLinkComponent", () => {
	let component: RouterLinkComponent;
	let fixture: ComponentFixture<RouterLinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [provideRouter(ROUTES)],
		}).compileComponents();

		fixture = TestBed.createComponent(RouterLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
