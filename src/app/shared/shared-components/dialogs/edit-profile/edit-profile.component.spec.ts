import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EditProfileComponent } from "./edit-profile.component";

describe("EditProfileComponent", () => {
	let component: EditProfileComponent;
	let fixture: ComponentFixture<EditProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(EditProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
