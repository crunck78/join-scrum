import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { ContactsComponent } from "./contacts.component";

describe("ContactsComponent", () => {
	let component: ContactsComponent;
	let fixture: ComponentFixture<ContactsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule, MaterialModule)],
		}).compileComponents();

		fixture = TestBed.createComponent(ContactsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
