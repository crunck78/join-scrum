import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { SummaryComponent } from "./summary.component";

describe("SummaryComponent", () => {
	let component: SummaryComponent;
	let fixture: ComponentFixture<SummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule), provideRouter(ROUTES)],
		}).compileComponents();

		fixture = TestBed.createComponent(SummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
