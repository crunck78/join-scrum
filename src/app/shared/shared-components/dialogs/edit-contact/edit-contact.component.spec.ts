import {} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EditContactComponent } from "./edit-contact.component";

describe("EditContactComponent", () => {
	let component: EditContactComponent;
	let fixture: ComponentFixture<EditContactComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
				{ provide: MatDialogRef, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(EditContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
