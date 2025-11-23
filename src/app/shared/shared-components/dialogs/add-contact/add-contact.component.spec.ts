import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { AddContactComponent } from "./add-contact.component";

describe("AddContactComponent", () => {
	let component: AddContactComponent;
	let fixture: ComponentFixture<AddContactComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(
					BrowserAnimationsModule,
					HttpClientModule,
					MaterialModule,
				),
				{ provide: MatDialogRef, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
